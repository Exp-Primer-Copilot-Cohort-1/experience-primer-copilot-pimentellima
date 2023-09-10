import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Client from 'App/Models/Client'
import { IClient, IUserClient } from 'Types/IClient'
import { ClientManagerInterface } from '../interface'

export class ClientsMongooseRepository implements ClientManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	public async create(
		data: Partial<IUserClient>,
		unity_id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const client = await (
			await Client.create({
				...data,
				email: data.email?.trim().toLowerCase(),
				partner: data.partner?.value,
				unity_id,
			})
		).populate('partners', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})
		return right(client.toObject() as unknown as IUserClient)
	}

	async updateById(
		data: Partial<IClient>,
		id: string,
	): PromiseEither<AbstractError, IUserClient> {
		const doc = await Client.findByIdAndUpdate(id, data, { new: true }).populate(
			'partners',
			{
				_id: 0,
				label: '$name',
				value: '$_id',
			},
		)

		if (!doc) {
			return left(new AbstractError('Não foi Encontrado o documento', 404))
		}

		return right(doc.toObject())
	}

	async findById(id: string): PromiseEither<AbstractError, IUserClient> {
		const client = await Client.findById(id).populate('partners', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		if (!client) {
			return left(new AbstractError('Não foi Encontrado o cliente', 404))
		}

		return right(client.toObject())
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, IUserClient[]> {
		const clients = await Client.find({ unity_id }).populate('partners', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return right(clients.map((client) => client.toObject()) || [])
	}
}
