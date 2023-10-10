import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

import { RFormSFManagerInterface } from 'App/Core/domain/repositories/interface/reply-form-standard-franchise-manager.interface'
import { RFormSFMongooseManager } from 'App/Core/domain/repositories/reply-form-standard-franchise/reply-form-standard-franchise-mongoose-repository'
import EmitEventDecorator from 'App/Decorators/EmitEvent'
import { inject, injectable, registry } from 'tsyringe'
import { ActivityNotGroupIdProvider } from '../../errors/activity-not-group-id-provider'
import { CurrentNotSmallerError } from '../../errors/current-not-smaller-error'

type In = { group_id: string }
type Out = { message: string }

@injectable()
@registry([{
	token: VerifyCurrentReplyInLessThanPreviousUseCase,
	useClass: VerifyCurrentReplyInLessThanPreviousUseCase
}])
export class VerifyCurrentReplyInLessThanPreviousUseCase implements UseCase<In, Out> {

	constructor(
		@inject(RFormSFMongooseManager) private readonly manager: RFormSFManagerInterface,
	) { } // eslint-disable-line

	@EmitEventDecorator('new:email-current-reply-in-greater-previous',
		{
			all_attrs: true,
			hasEmitterInRight: false,
		}
	)
	public async execute(
		{ group_id }: In,
	): PromiseEither<CurrentNotSmallerError, Out> {
		if (!group_id) return left(new ActivityNotGroupIdProvider())
		const repliesOrErr = await this.manager.findAllByGroupId(group_id)

		if (repliesOrErr.isLeft()) return left(repliesOrErr.extract())

		const replies = repliesOrErr.extract()

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
			const index = previousReply.questions.findIndex((q) => q._id === question._id)
			return question.answer < previousReply.questions[index].answer
		})

		if (!isSmaller) return left(new CurrentNotSmallerError())

		return right({ message: 'The current reply is less than previous' })
	}
}
