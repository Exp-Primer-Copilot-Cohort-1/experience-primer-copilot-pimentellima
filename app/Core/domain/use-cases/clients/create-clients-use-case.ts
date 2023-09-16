import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import type { IUserClient } from 'App/Types/IClient'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ClientManagerInterface } from '../../repositories/interface'

export class CreateClientsUseCase implements UseCase<IUserClient, IUserClient> {
	constructor(private readonly manager: ClientManagerInterface) { } // eslint-disable-line

	public async execute({
		unity_id,
		...client
	}: IUserClient): PromiseEither<AbstractError, IUserClient> {
		if (!unity_id) return left(new UnitNotFoundError())

		const clientOrErr = await this.manager.create(client, unity_id.toString())

		return clientOrErr
	}
}
