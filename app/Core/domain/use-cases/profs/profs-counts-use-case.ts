import { ProfsMongooseRepository } from "App/Core/domain/repositories";
import { ICount } from "App/Core/domain/repositories/helpers/count";
import { ProfsManagerContract } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: ProfsCountsUseCase, useClass: ProfsCountsUseCase }])
export class ProfsCountsUseCase
	implements UseCase<In, ICount>
{
	constructor(
		@inject(ProfsMongooseRepository) private readonly manager: ProfsManagerContract
	) { }

	public async execute(): PromiseEither<AbstractError, ICount> {
		return await this.manager.getCount()
	}
}
