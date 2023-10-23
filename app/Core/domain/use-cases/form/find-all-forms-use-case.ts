import FormEntity from "App/Core/domain/entities/form/form";
import { FormMongoRepository } from "App/Core/domain/repositories/form/form-mongo-repository";
import { FormManagerContract } from "App/Core/domain/repositories/interface/form-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";
import { UnityNotFoundError } from "../../errors";

type TypeParams = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllFormsUseCase, useClass: FindAllFormsUseCase }])
export class FindAllFormsUseCase
	implements UseCase<TypeParams, FormEntity[]>
{
	constructor(
		@inject(FormMongoRepository) private readonly manager: FormManagerContract
	) { }

	public async execute(
		{ unity_id }
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		return await this.manager.findAll(unity_id);
	}
}
