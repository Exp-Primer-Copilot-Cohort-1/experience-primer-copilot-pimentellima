import { IdNotProvidedError } from "App/Core/domain/errors/id-not-provided";
import { CRUDRepository } from "App/Core/domain/repositories";
import { GenericManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = {
	id?: string
}

@injectable()
@registry([{ token: FindByIdUseCase, useClass: FindByIdUseCase }])
export class FindByIdUseCase<T>
	implements UseCase<In, T>
{
	constructor(
		@inject(CRUDRepository) private readonly manager: GenericManagerInterface<T>
	) { }

	public async execute({ id }): PromiseEither<AbstractError, T> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.findById(id)
	}
}
