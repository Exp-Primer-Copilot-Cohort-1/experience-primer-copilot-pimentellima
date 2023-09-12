import { UseCase } from "App/Core/interfaces/use-case.interface";
import { IAnswer } from "Types/IFormSubmission";
import { AnswerEntity } from "../../entities/answer/answer";
import { AnswerManagerInterface } from "../../repositories/interface/answer-manager-interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

type TypeParams = {
	answer: IAnswer;
	id: string;
};

export class UpdateAnswerByIdUseCase
	implements UseCase<TypeParams, AnswerEntity>
{
	constructor(private readonly answerManager: AnswerManagerInterface) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AnswerEntity> {
		const answerOrErr = await this.answerManager.updateAnswerById(
			params.answer,
			params.id
		);

		if (answerOrErr.isLeft()) return left(answerOrErr.extract());
		return right(answerOrErr.extract());
	}
}
