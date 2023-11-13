import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

import { ActivityNotGroupIdProvider } from 'App/Core/domain/errors/activity-not-group-id-provider'
import { CurrentNotSmallerError } from 'App/Core/domain/errors/current-not-smaller-error'
import { FormNotTypeProvider } from 'App/Core/domain/errors/form-not-type-provider'
import { QuestionNotFound } from 'App/Core/domain/errors/question-not-found'
import { RFormSFManagerContract } from 'App/Core/domain/repositories/interface/reply-form-standard-franchise-manager.interface'
import { RFormSFMongooseManager } from 'App/Core/domain/repositories/reply-form-standard-franchise/reply-form-standard-franchise-mongoose-repository'
import { EventEmitter } from 'App/Core/infra/event-emitter'
import { IEventEmitter } from 'App/Core/infra/infra'
import { TypeForms } from 'App/Types/IBusinessFranchises'
import { inject, injectable, registry } from 'tsyringe'
type In = { group_id: string, type: TypeForms }
type Out = { message: string }

@injectable()
@registry([{
	token: VerifyCurrentReplyInLessThanPreviousUseCase,
	useClass: VerifyCurrentReplyInLessThanPreviousUseCase
}])
export class VerifyCurrentReplyInLessThanPreviousUseCase implements UseCase<In, Out> {

	constructor(
		@inject(RFormSFMongooseManager) private readonly manager: RFormSFManagerContract,
		@inject(EventEmitter) private readonly eventEmitter?: IEventEmitter
	) { } // eslint-disable-line

	public async execute(
		{ group_id, type }: In,
	): PromiseEither<CurrentNotSmallerError, Out> {
		if (!group_id) return left(new ActivityNotGroupIdProvider())
		if (!type) return left(new FormNotTypeProvider())

		const repliesOrErr = await this.manager.findAllByGroupId(group_id, type)

		if (repliesOrErr.isLeft()) return left(repliesOrErr.extract())

		const replies = repliesOrErr.extract()

		if (!replies) return right({ message: "Don't have previous reply" })
		if (replies.length <= 1) return right({ message: "Don't have previous reply" })

		// ordena do mais novo para o mais velho
		const sortedReplies = replies.sort((a, b) => {
			const dateA = a?.created_at as Date
			const dateB = b?.created_at as Date
			return dateB.getTime() - dateA.getTime()
		})

		const currentReply = sortedReplies[0]
		const previousReply = sortedReplies[1]

		// comparar questões de currentReply com previousReply
		const isSmaller = currentReply.questions.every((question) => {
			const index = previousReply.questions.findIndex((q) =>
				q.value?.toString() === question.value?.toString()
			)
			if (index === -1) throw new QuestionNotFound()

			if (question.answer === 0) return true

			return question.answer < previousReply.questions[index].answer
		})

		if (!isSmaller) {
			this.eventEmitter?.emit('new:email-current-reply-in-greater-previous', { group_id })
			return left(new CurrentNotSmallerError())
		}

		return right({ message: 'The current reply is less than previous' })
	}
}
