import { AnswerEntity } from "App/Core/domain/entities/answer/answer";
import { AnswerManagerContract } from "App/Core/domain/repositories/interface/answer-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";

type TypeParams = {
	unity_id: string;
	form_id: string;
};

export class FindAnswersByFormIdUseCase
	implements UseCase<TypeParams, AnswerEntity[]>
{
	constructor(private readonly answerManager: AnswerManagerContract) { }

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AnswerEntity[]> {
		const answerOrErr = await this.answerManager.findAnswersByFormId(
			params.unity_id,
			params.form_id
		);

		if (answerOrErr.isLeft()) return left(answerOrErr.extract());
		return right(answerOrErr.extract());
	}
}
