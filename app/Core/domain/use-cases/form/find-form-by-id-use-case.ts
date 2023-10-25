import FormEntity from "App/Core/domain/entities/form/form";
import { IdNotProvidedError } from "App/Core/domain/errors/id-not-provided";
import { FormMongoRepository } from "App/Core/domain/repositories/form/form-mongo-repository";
import { FormManagerContract } from "App/Core/domain/repositories/interface/form-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type TypeParams = {
	id: string
}
@injectable()
@registry([{ token: FindFormByIdUseCase, useClass: FindFormByIdUseCase }])
export class FindFormByIdUseCase
	implements UseCase<TypeParams, FormEntity>
{
	constructor(
		@inject(FormMongoRepository) private readonly manager: FormManagerContract) { }

	public async execute(
		{ id }
	): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new IdNotProvidedError())
		const formOrErr =
			await this.manager.findById(id);

		if (formOrErr.isLeft()) return left(formOrErr.extract());
		const form = formOrErr.extract();
		return right(form);
	}
}
