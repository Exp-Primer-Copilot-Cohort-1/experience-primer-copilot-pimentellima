import { ClientEntity } from 'App/Core/domain/entities/clients/client'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IUserClient } from 'App/Types/IClient'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateClientsUseCase, useClass: CreateClientsUseCase }])
export class CreateClientsUseCase implements UseCase<IUserClient, IUserClient> {

	constructor(
		@inject(ClientsMongooseRepository) private readonly manager: ClientManagerInterface
	) { } // eslint-disable-line

	public async execute(data: IUserClient): PromiseEither<AbstractError, IUserClient> {
		if (!data.unity_id) return left(new UnityNotFoundError())

		const clientEntity = await ClientEntity.build(data)

		if (clientEntity.isLeft()) return clientEntity

		const client = clientEntity.extract()

		return await this.manager.create(client, data.unity_id.toString())
	}
}
