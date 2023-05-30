import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionController {
	public async index() {
		try {
			const permissions = await Permission.find()
			return permissions
		} catch (err) {
			console.log(err)
		}
	}

	public async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()

		const permissions = await Permission.create({
			...data,
			unity_id: userLogged?.unity_id,
		})
		return permissions
	}

	public async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const permissions = await Permission.find(params.id)
		if (permissions) {
			const data = request.all()
			permissions.merge({
				...data,
				unity_id: userLogged.unity_id,
			})
			await permissions.save()
			return permissions
		}
	}

	public async show({ auth, params }: HttpContextContract) {
		const id = params.id
		const userLogged = auth.user
		const permissions = await Permission.findOne({
			unity_id: userLogged?.unity_id,
			_id: id,
		})

		return permissions
	}
}
