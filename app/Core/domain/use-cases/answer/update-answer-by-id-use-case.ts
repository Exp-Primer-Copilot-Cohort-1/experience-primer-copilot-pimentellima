import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAnswer } from 'App/Types/IAnswer'
import { AnswerEntity } from '../../entities/answer/answer'
import { AnswerManagerInterface } from '../../repositories/interface/answer-manager-interface'

type TypeParams = {
	answer: IAnswer
	id: string
}

export class UpdateAnswerByIdUseCase implements UseCase<TypeParams, AnswerEntity> {
	constructor(private readonly answerManager: AnswerManagerInterface) { }

	public async execute(params: TypeParams): PromiseEither<AbstractError, AnswerEntity> {
		const answerOrErr = await this.answerManager.updateAnswerById(
			params.answer,
			params.id,
		)

		if (answerOrErr.isLeft()) return left(answerOrErr.extract())
		return right(answerOrErr.extract())
	}
}
