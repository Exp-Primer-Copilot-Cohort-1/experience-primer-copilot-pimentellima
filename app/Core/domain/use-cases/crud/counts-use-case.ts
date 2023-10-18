import { CRUDRepository } from "App/Core/domain/repositories";
import { ICount } from "App/Core/domain/repositories/helpers/count";
import { GenericManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: CountsUseCase, useClass: CountsUseCase }])
export class CountsUseCase<T>
	implements UseCase<In, ICount>
{
	constructor(
		@inject(CRUDRepository) private readonly manager: GenericManagerInterface<T>
	) { }

	public async execute(): PromiseEither<AbstractError, ICount> {
		return await this.manager.getCount()
	}
}
