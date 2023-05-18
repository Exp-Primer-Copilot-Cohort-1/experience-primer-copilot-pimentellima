'use strict'
import ENV from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

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
		})
			.select(SELECTS)
			.lean()

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
		}).lean()

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
			password: ENV.get('APP_KEY'),
			due_date: null,
			email: data.email?.trim().toLowerCase() || '',
		})

		return user
	}
}

export default ClientController
