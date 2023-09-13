'use strict'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

import { adaptRoute } from 'App/Core/adapters'
import {
	makeClientCreateComposer,
	makeClientUpdateComposer,
} from 'App/Core/composers/clients/make'
import { IUserClient } from 'App/Types/IClient'
import SELECTS from '../user-select'

class ClientController {
	async verifyExistenceClient({ request, auth, response }: HttpContextContract) {
		const { name, birth_date } = request.all()
		const unity_id = auth.user?.unity_id
		if (!name || !birth_date) {
			return response.status(400).json({
				message: 'Missing Name Or Birth Day',
			})
		}

		const user = await Client.findOne({
			name,
			birth_date,
			unity_id,
		}).select(SELECTS)

		if (!user) {
			return response.status(404).json({
				message: 'Client Not Found',
			})
		}

		return user
	}

	async createMany({ request, auth, response }: HttpContextContract) {
		const data: IUserClient[] = Object.keys(request.all()).map(
			(key) => request.all()[key],
		)
		const unity_id = auth.user?.unity_id

		const users = await Promise.all(
			data.map(async (clientData) => {
				const { name, birth_date, email, celphone } = clientData
				if (!name || !celphone) {
					return response.status(400).json({
						message: 'Missing Name Or CellPhone',
					})
				}

				const userData = await Client.findOne({
					email,
					name,
					birth_date,
					unity_id,
				})

				if (userData?.active) {
					return response.status(400).send({
						error: {
							message: 'Este cliente já está cadastrado na unidade.',
						},
					})
				}

				return await Client.create({
					...clientData,
					unity_id: unity_id,
					active: true,
					due_date: null,
					email,
				})
			}),
		)

		return users
	}

	async create(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeClientCreateComposer(), ctx, {
			unity_id,
		})
	}

	public async findAllUsersClientsInative({ auth }) {
		const userLogged = auth.user

		const clients = await Client.find({
			unity_id: userLogged?.unity_id,
			active: false,
		}).populate('partner', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return clients
	}

	public async findAllUsersClients({ auth }) {
		const userLogged = auth.user

		const clients = await Client.find({
			unity_id: userLogged?.unity_id.toString(),
			active: true,
		}).populate('partner', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return clients
	}

	public async findUserClientByID({ params }) {
		const user = await Client.findById(params.id).populate('partner', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return user
	}

	public async update(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeClientUpdateComposer(), ctx, {
			unity_id,
		})
	}
}

export default ClientController
