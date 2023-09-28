import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Client, { COLLECTIONS_REFS } from 'App/Models/Client'
import { IClient, IUserClient } from 'App/Types/IClient'
import { ClientNotFoundError } from '../../errors/clients-not-found'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { ClientManagerInterface } from '../interface'

export class ClientsMongooseRepository implements ClientManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	public async create(
		{ _id, ...data }: Partial<IUserClient>,
		unity_id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.create({
			...data,
			email: data.email?.trim().toLowerCase(),
			partner: data.partner?.value,
			unity_id,
		})

		return right(doc.toObject())
	}

	async updateById(
		data: Partial<IClient>,
		id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.findByIdAndUpdate(id, data, { new: true }).populate(
			COLLECTIONS_REFS.PARTNERS,
			PROJECTION_DEFAULT,
		)

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
