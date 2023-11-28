import { SecsMongooseRepository } from "App/Core/domain/repositories";
import { SecsManagerContract } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { IUser } from "App/Types/IUser";
import { inject, injectable, registry } from "tsyringe";

type In = IUser & { id: string }

@injectable()
@registry([{ token: UpdateSecsUseCase, useClass: UpdateSecsUseCase }])
export class UpdateSecsUseCase
	implements UseCase<In, IUser>
{
	constructor(
		@inject(SecsMongooseRepository) private readonly manager: SecsManagerContract
	) { }

	public async execute({
		id,
		...data
	}: In): PromiseEither<AbstractError, IUser> {
		return await this.manager.update(id, data)
	}
}
