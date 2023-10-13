import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IUserClient } from 'App/Types/IClient'
import { ClientEntity } from '../../entities/clients/client'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { ClientManagerInterface } from '../../repositories/interface'

export class CreateClientsUseCase implements UseCase<IUserClient, IUserClient> {
	constructor(private readonly manager: ClientManagerInterface) { } // eslint-disable-line

	public async execute(data: IUserClient): PromiseEither<AbstractError, IUserClient> {
		if (!data.unity_id) return left(new UnityNotFoundError())

		const clientEntity = await ClientEntity.build(data)

		if (clientEntity.isLeft()) return clientEntity

		const client = clientEntity.extract()

		const clientOrErr = await this.manager.create(client, data.unity_id.toString())

		return clientOrErr
	}
}
