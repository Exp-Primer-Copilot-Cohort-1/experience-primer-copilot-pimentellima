import { AnswerEntity } from 'App/Core/domain/entities/answer/answer'
import { AnswerManagerInterface } from 'App/Core/domain/repositories/interface/answer-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAnswer } from 'App/Types/IAnswer'

export class CreateAnswerUseCase implements UseCase<IAnswer, AnswerEntity> {
	constructor(private readonly answerManager: AnswerManagerInterface) { }

	public async execute(answer: IAnswer): PromiseEither<AbstractError, AnswerEntity> {
		const newAnswerOrErr = await this.answerManager.createAnswer(answer)

		if (newAnswerOrErr.isLeft()) return left(newAnswerOrErr.extract())
		return right(newAnswerOrErr.extract())
	}
}
