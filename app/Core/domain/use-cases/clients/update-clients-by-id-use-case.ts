import { ClientEntity } from 'App/Core/domain/entities/clients/client'
import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IUserClient } from 'App/Types/IClient'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	id: string
} & IUserClient

@injectable()
@registry([{ token: UpdateClientsByIdUseCase, useClass: UpdateClientsByIdUseCase }])
export class UpdateClientsByIdUseCase implements UseCase<In, IUserClient> {

	constructor(
		@inject(ClientsMongooseRepository) readonly manager: ClientManagerContract,
	) { } // eslint-disable-line

	public async execute({
		id,
		...data
	}: In): PromiseEither<AbstractError, IUserClient> {
		const clientEntity = await ClientEntity.build(data)

		if (clientEntity.isLeft()) return clientEntity

		const client = clientEntity.extract()

		const clientOrErr = await this.manager.updateById(client, id)

		return clientOrErr
	}
}
