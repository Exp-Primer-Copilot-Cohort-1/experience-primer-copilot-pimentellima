import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAdminUserComposer } from 'App/Core/composers'
import User from 'App/Models/User'
// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const SELECTS = require('../user-select')

const mongoose = require('mongoose')

const _ = require('lodash')

function customIsEquals(first, second) {
	const val = []
	_.forEach(second, (value, key) => {
		if (first[key] !== value) {
			val.push({ value, key })
		}
	})
	return val
}

class UserController {
	public async index({ request, auth }) {
		const userLogged = auth.user
		try {
			const data = request.only(['name'])

			if (data.name) {
				const users = await User.where({
					name: { $regex: new RegExp(`.*${data.name}.*`) },
					unity_id: userLogged.unity_id,
				})
					.select(SELECTS)
					.sort('-name')
					.with('unity')
					.with('answer')
					.with('activity')
					.with('userLog')
					.fetch()
				return users
			}
			const users = await User.where({
				unity_id: userLogged.unity_id,
			})
				.select(SELECTS)
				.with('answer')
				.with('activity')
				.with('unity')
				.with('userLog')
				.fetch()

			return users
		} catch (err) {
			console.log(err)
			return false
		}
	}

	public async indexByType({ request }) {
		try {
			const { unity, type } = request.only(['name', 'type', 'unity'])

			const users = User.where({
				unity_id: mongoose.Types.ObjectId(unity),
				type: { $regex: new RegExp(`.*${type}.*`) },
			})
				.select(SELECTS)
				.sort('-name')
				.with('unity')
				.with('answer')
				.with('activity')
				.fetch()
			return users
		} catch (err) {
			return false
		}
	}

	public async store(ctx) {
		return adaptRoute(makeCreateAdminUserComposer(), ctx)
	}

	public async update({ params, request }: HttpContextContract) {
		const data = request.all()

		const user = await User.findById(params.id, data).orFail()

		await user.save()
		return user
	}

	public async show({ params }) {
		const user = await User.where({ _id: params.id })
			.select(SELECTS)
			.with('unity')
			.with('answer')
			.with('activity')
			.with('userLog')
			.firstOrFail()

		return user
	}

	public async destroy({ params }) {
		const user = await User.where({ _id: params.id }).firstOrFail()
		await user.delete()
	}
}

export default UserController
