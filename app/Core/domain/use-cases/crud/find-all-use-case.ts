import { CRUDRepository } from "App/Core/domain/repositories";
import { GenericManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: FindAllUseCase, useClass: FindAllUseCase }])
export class FindAllUseCase<T>
	implements UseCase<In, T[]>
{
	constructor(
		@inject(CRUDRepository) private readonly manager: GenericManagerInterface<T>
	) { }

	public async execute(): PromiseEither<AbstractError, T[]> {
		return await this.manager.findAll()
	}
}
