import { ICount } from "App/Core/domain/repositories/helpers/count";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";
import { CountsMongooseRepository } from "../../repositories/counts";
import { CountsManagerInterface } from "../../repositories/counts/counts-manager.interface";

type In = never

@injectable()
@registry([{ token: CountsUseCase, useClass: CountsUseCase }])
export class CountsUseCase
	implements UseCase<In, ICount>
{
	constructor(
		@inject(CountsMongooseRepository) private readonly manager: CountsManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, ICount> {
		return await this.manager.getCount()
	}
}
