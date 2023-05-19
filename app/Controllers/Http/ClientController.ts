'use strict'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

import SELECTS from '../user-select'

const fetchUserByType = async (unityId, active = true) =>
	await Client.where({
		unity_id: unityId,
		active,
	})

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

	async create({ request, auth, response }: HttpContextContract) {
		const data = request.all()
		const unity_id = auth.user?.unity_id

		const { name, birth_date, email, celphone } = data

		if (!name || !birth_date || !email || !celphone) {
			return response.status(400).json({
				message: 'Missing Name Or Birth Day Or Email Or CellPhone',
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

		const user = await Client.create({
			...data,
			unity_id: unity_id,
			active: true,
			due_date: null,
			email: data.email?.trim().toLowerCase() || '',
		})

		return user
	}

	public async findAllUsersClientsInative({ auth }) {
		const userLogged = auth.user

		const clients = await Client.find({
			unity_id: userLogged?.unity_id,
			active: false,
		})

		return clients
	}

	public async findAllUsersClients({ auth }) {
		const userLogged = auth.user

		const clients = await Client.find({
			unity_id: userLogged?.unity_id,
			active: true,
		})

		return clients
	}

	public async findUserClientByID({ params }) {
		const user = await Client.find({ _id: params.id, type: 'client' })
			.select(SELECTS)
			.orFail()

		return user
	}

	public async update({ params, request }: HttpContextContract) {
		const data = request.all()
		const user = await Client.findByIdAndUpdate(params.id, data).orFail()

		await user.save()
		return user
	}
}

export default ClientController
