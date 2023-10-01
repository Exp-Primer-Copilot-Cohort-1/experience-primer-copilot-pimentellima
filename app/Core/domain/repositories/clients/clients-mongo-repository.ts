import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Client, { COLLECTIONS_REFS } from 'App/Models/Client'
import { IUserClient } from 'App/Types/IClient'
import { ClientEntity } from '../../entities/clients/client'
import { ClientNotFoundError } from '../../errors/clients-not-found'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { ClientManagerInterface } from '../interface'

export class ClientsMongooseRepository implements ClientManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	async create(
		{ _id, ...data }: ClientEntity,
		unity_id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.create({
			...data,
			email: data.email?.trim().toLowerCase(),
			unity_id,
		})

		return right(doc.toObject())
	}

	async updateById(
		data: ClientEntity,
		id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.findByIdAndUpdate(id, data, { new: true })

		if (!doc) {
			return left(new ClientNotFoundError())
		}

		return right(doc.toObject())
	}

	async findById(id: string): PromiseEither<AbstractError, IUserClient> {
		const client = await Client.findById(id).populate(
			COLLECTIONS_REFS.PARTNERS,
			PROJECTION_DEFAULT,
		)

		if (!client) {
			return left(new ClientNotFoundError())
		}

		return right(client.toObject())
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, IUserClient[]> {
		const clients = await Client.find({ unity_id }).populate(
			COLLECTIONS_REFS.PARTNERS,
			PROJECTION_DEFAULT,
		)

		return right(clients.map((client) => client.toObject()) || [])
	}
}
