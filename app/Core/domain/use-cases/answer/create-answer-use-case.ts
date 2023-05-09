import { UseCase } from "App/Core/interfaces/use-case.interface";
import { IAnswer } from "Types/IAnswer";
import { AnswerEntity } from "../../entities/answer/answer";
import { AnswerManagerInterface } from "../../repositories/interface/answer-manager-interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

export class CreateAnswerUseCase
	implements UseCase<IAnswer, AnswerEntity>
{
	constructor(
		private readonly answerManager: AnswerManagerInterface
	) {}

	public async execute(
		answer: IAnswer
	): PromiseEither<AbstractError, AnswerEntity> {

		const newAnswerOrErr =
			await this.answerManager.createAnswer(answer);

		if (newAnswerOrErr.isLeft()) return left(newAnswerOrErr.extract());
		return right(newAnswerOrErr.extract());
	}
}
