import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import FormEntity from "../../entities/form/form";
import { FormManagerInterface } from "../../repositories/interface/form-manager-interface";

type TypeParams = {
	unity_id: string
    prof_id: string
}

export class FindFormByProfIdUseCase
	implements UseCase<TypeParams, FormEntity[]>
{
	constructor(
		private readonly formManager: FormManagerInterface
	) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, FormEntity[]> {

		const formsOrErr =
			await this.formManager.findFormsByProfId(params.unity_id, params.prof_id);

		if (formsOrErr.isLeft()) return left(formsOrErr.extract());
		const forms = formsOrErr.extract();
		return right(forms);
	}
}
