import { UnityIdNotProvidedError } from "App/Core/domain/errors";
import { ClientsMongooseRepository } from "App/Core/domain/repositories";
import { ClientManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IUserClient } from "App/Types/IClient";
import { inject, injectable, registry } from "tsyringe";

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllClientsUseCase, useClass: FindAllClientsUseCase }])
export class FindAllClientsUseCase
	implements UseCase<In, IUserClient[]>
{
	constructor(
		@inject(ClientsMongooseRepository) private readonly manager: ClientManagerInterface
	) { }

	public async execute(
		{ unity_id }: In
	): PromiseEither<AbstractError, IUserClient[]> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		return await this.manager.findAll(unity_id)
	}
}
