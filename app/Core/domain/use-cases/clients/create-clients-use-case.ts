import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IUserClient } from 'Types/IClient'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ClientManagerInterface } from '../../repositories/interface'

export class CreateClientsUseCase implements UseCase<IUserClient, IUserClient> {
	constructor(private readonly accountManager: ClientManagerInterface) { }

	@LogDecorator('clients', 'post')
	public async execute({
		unity_id,
		...client
	}: IUserClient): PromiseEither<AbstractError, IUserClient> {
		if (!unity_id) return left(new UnitNotFoundError())

		const clientOrErr = await this.accountManager.create(client, unity_id.toString())

		if (clientOrErr.isLeft()) return left(clientOrErr.extract())

		const doc = clientOrErr.extract()

		return right(doc)
	}
}
