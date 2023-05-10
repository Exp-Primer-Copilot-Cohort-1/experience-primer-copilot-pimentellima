import { UseCase } from "App/Core/interfaces/use-case.interface";
import { AnswerEntity } from "../../entities/answer/answer";
import { AnswerManagerInterface } from "../../repositories/interface/answer-manager-interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

type TypeParams = {
	unity_id: string;
	client_id: string;
};

export class FindAnswersByClientIdUseCase
	implements UseCase<TypeParams, AnswerEntity[]>
{
	constructor(private readonly answerManager: AnswerManagerInterface) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AnswerEntity[]> {
		const answerOrErr = await this.answerManager.findAnswersByClientId(
			params.unity_id,
            params.client_id
		);

		if (answerOrErr.isLeft()) return left(answerOrErr.extract());
		return right(answerOrErr.extract());
	}
}
