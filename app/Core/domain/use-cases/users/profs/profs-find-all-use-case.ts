import { ProfsMongooseRepository } from "App/Core/domain/repositories";
import { ProfsManagerContract } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { IUser } from "App/Types/IUser";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: ProfsFindAllUseCase, useClass: ProfsFindAllUseCase }])
export class ProfsFindAllUseCase
	implements UseCase<In, IUser[]>
{
	constructor(
		@inject(ProfsMongooseRepository) private readonly manager: ProfsManagerContract
	) { }

	public async execute(): PromiseEither<AbstractError, IUser[]> {
		return await this.manager.findAll()
	}
}
