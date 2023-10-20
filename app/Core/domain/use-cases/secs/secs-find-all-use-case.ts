import { SecsMongooseRepository } from "App/Core/domain/repositories";
import { SecsManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { IUser } from "App/Types/IUser";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: SecsFindAllUseCase, useClass: SecsFindAllUseCase }])
export class SecsFindAllUseCase
	implements UseCase<In, IUser[]>
{
	constructor(
		@inject(SecsMongooseRepository) private readonly manager: SecsManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, IUser[]> {
		return await this.manager.findAll()
	}
}
