import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { IUserClient } from 'App/Types/IClient'
import { ClientManagerInterface } from '../../repositories/interface'

type TypeParams = {
	id: string
} & IUserClient

export class UpdateClientsByIdUseCase implements UseCase<TypeParams, IUserClient> {
	constructor(private readonly manager: ClientManagerInterface) { } // eslint-disable-line

	public async execute({
		id,
		...client
	}: TypeParams): PromiseEither<AbstractError, IUserClient> {
		const clientOrErr = await this.manager.updateById(client, id)

		if (clientOrErr.isLeft()) {
			return clientOrErr
		}

		const doc = clientOrErr.extract()

		return right(doc)
	}
}
