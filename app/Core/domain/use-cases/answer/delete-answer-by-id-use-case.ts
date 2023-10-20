import { AnswerEntity } from "App/Core/domain/entities/answer/answer";
import { AnswerManagerInterface } from "App/Core/domain/repositories/interface/answer-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";

type TypeParams = {
	id: string;
};

export class DeleteAnswerByIdUseCase
	implements UseCase<TypeParams, AnswerEntity>
{
	constructor(private readonly answerManager: AnswerManagerInterface) { }

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AnswerEntity> {
		const answerOrErr = await this.answerManager.deleteAnswerById(
			params.id
		);

		if (answerOrErr.isLeft()) return left(answerOrErr.extract());
		return right(answerOrErr.extract());
	}
}
