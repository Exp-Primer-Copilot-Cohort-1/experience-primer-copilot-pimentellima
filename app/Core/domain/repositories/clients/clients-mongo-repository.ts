import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Client from 'App/Models/Client'
import { IClient, IUserClient } from 'Types/IClient'
import { ClientManagerInterface } from '../interface'

export class ClientsMongooseRepository implements ClientManagerInterface {
	constructor() { }

	public async create(
		data: Partial<IClient>,
		unity_id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const configs = await Client.create({
			...data,
			email: data.email?.trim().toLowerCase(),
			unity_id,
		})
		return right(configs.toObject())
	}

	async updateById(
		data: Partial<IClient>,
		id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.findByIdAndUpdate(id, data, { new: true })

		if (!doc) {
			return left(new AbstractError('Não foi Encontrado o documento', 404))
		}

		return right(doc.toObject())
	}

	async findById(id: string): PromiseEither<AbstractError, IUserClient> {
		const client = await Client.findById(id)

		if (!client) {
			return left(new AbstractError('Não foi Encontrado o cliente', 404))
		}

		return right(client.toObject())
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, IUserClient[]> {
		const clients = await Client.find({ unity_id })

		return right(clients.map((client) => client.toObject()) || [])
	}
}
