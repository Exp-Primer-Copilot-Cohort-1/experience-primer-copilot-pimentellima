import { ClientEntity } from 'App/Core/domain/entities/clients/client'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ClientNotFoundError } from 'App/Core/domain/errors/clients-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Client, { COLLECTIONS_REFS } from 'App/Models/Client'
import { IUserClient } from 'App/Types/IClient'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { ClientManagerContract } from './client-manager.interface'

@injectable()
@registry([{ token: ClientsMongooseRepository, useClass: ClientsMongooseRepository }])
export class ClientsMongooseRepository implements ClientManagerContract {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { }

	async getCount(unity_id: string): PromiseEither<AbstractError, ICount> {
		const count = await Client.countDocuments({ unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

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
		const clients = await Client.find({ unity_id })
			.sort(this.opts.sort)
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.populate(
				COLLECTIONS_REFS.PARTNERS,
				PROJECTION_DEFAULT,
			)

		return right(clients?.map((client) => client.toObject()) || [])
	}
}
