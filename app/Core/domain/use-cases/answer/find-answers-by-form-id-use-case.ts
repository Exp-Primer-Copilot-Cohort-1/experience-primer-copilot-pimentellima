import { UseCase } from "App/Core/interfaces/use-case.interface";
import { AnswerEntity } from "../../entities/answer/answer";
import { AnswerManagerInterface } from "../../repositories/interface/answer-manager-interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

type TypeParams = {
	unity_id: string;
	form_id: string;
};

export class FindAllAnswersUseCase
	implements UseCase<TypeParams, AnswerEntity[]>
{
	constructor(private readonly answerManager: AnswerManagerInterface) {}

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
