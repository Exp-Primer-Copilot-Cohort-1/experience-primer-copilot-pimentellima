import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeUnityUpdateByIdComposer } from 'App/Core/composers/unities/make-unities-update-by-id-composer'
import { makeUnityFindAllByNameComposer } from 'App/Core/composers/unities/make-unity-find-by-name-composer'
import { makeUnityShowByIdComposer } from 'App/Core/composers/unities/make-unity-show-by-id-composer'
import Unity, { COLLECTION_NAME } from 'App/Models/Unity'
import LogDecorator, { ACTION } from '../Decorators/Log'
class UnityController {
	public async index(ctx: HttpContextContract) {
		return adaptRoute(makeUnityFindAllByNameComposer(), ctx)
	}

	public async findByName({ params, response }: HttpContextContract) {
		const { email } = params

		const unity = await Unity.findOne(
			{
				email,
				active: true,
			},
			{ _id: 0, name: 1 },
		)

		if (!unity) {
			return response.status(404).send({
				error: {
					message: 'Unidade não encontrada.',
				},
			})
		}

		return unity
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async update(ctx: HttpContextContract) {
		return adaptRoute(makeUnityUpdateByIdComposer(), ctx)
	}

	public async show(ctx: HttpContextContract) {
		return adaptRoute(makeUnityShowByIdComposer(), ctx)
	}
}

export default UnityController
