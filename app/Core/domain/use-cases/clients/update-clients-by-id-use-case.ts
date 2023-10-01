import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { IUserClient } from 'App/Types/IClient'
import { ClientEntity } from '../../entities/clients/client'
import { ClientManagerInterface } from '../../repositories/interface'

type TypeParams = {
	id: string
} & IUserClient

export class UpdateClientsByIdUseCase implements UseCase<TypeParams, IUserClient> {
	constructor(private readonly manager: ClientManagerInterface) { } // eslint-disable-line

	public async execute({
		id,
		...data
	}: TypeParams): PromiseEither<AbstractError, IUserClient> {
		const clientEntity = await ClientEntity.build(data)

		if (clientEntity.isLeft()) return clientEntity

		const client = clientEntity.extract()

		const clientOrErr = await this.manager.updateById(client, id)

		if (clientOrErr.isLeft()) return clientOrErr

		const doc = clientOrErr.extract()

		return right(doc)
	}
}
