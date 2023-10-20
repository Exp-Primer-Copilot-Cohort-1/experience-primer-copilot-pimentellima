import { SecsMongooseRepository } from "App/Core/domain/repositories";
import { ICount } from "App/Core/domain/repositories/helpers/count";
import { SecsManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: SecsCountsUseCase, useClass: SecsCountsUseCase }])
export class SecsCountsUseCase
	implements UseCase<In, ICount>
{
	constructor(
		@inject(SecsMongooseRepository) private readonly manager: SecsManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, ICount> {
		return await this.manager.getCount()
	}
}
