import FormEntity from "App/Core/domain/entities/form/form";
import { FormManagerInterface } from "App/Core/domain/repositories/interface/form-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";
import { UnityNotFoundError } from "../../errors";
import { FormMongoRepository } from "../../repositories/form/form-mongo-repository";

type TypeParams = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllFormsUseCase, useClass: FindAllFormsUseCase }])
export class FindAllFormsUseCase
	implements UseCase<TypeParams, FormEntity[]>
{
	constructor(
		@inject(FormMongoRepository) private readonly manager: FormManagerInterface
	) { }

	public async execute(
		{ unity_id }
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const formsOrErr =
			await this.manager.findAll(unity_id);

		if (formsOrErr.isLeft()) return left(formsOrErr.extract());
		const forms = formsOrErr.extract();
		return right(forms);
	}
}
