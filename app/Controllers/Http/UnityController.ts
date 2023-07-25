import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeUnityUpdateByIdComposer } from 'App/Core/composers/unities/make-unities-update-by-id-composer'
import { makeUnityDeleteByIdComposer } from 'App/Core/composers/unities/make-unity-delete-by-id-composer'
import { makeUnityFindAllByNameComposer } from 'App/Core/composers/unities/make-unity-find-by-name-composer'
import { makeUnityShowByIdComposer } from 'App/Core/composers/unities/make-unity-show-by-id-composer'
import Unity from 'App/Models/Unity'
class UnityController {
	public async index(ctx: HttpContextContract) {
		return adaptRoute(makeUnityFindAllByNameComposer(), ctx)
	}

	public async store({ request, response }: HttpContextContract) {
		const data = request.only([
			'name',
			'is_company',
			'document',
			'phones',
			'cnaes',
			'site',
			'cep',
			'address',
			'neighbohood',
			'address_number',
			'complement',
			'city',
			'state',
			'country',
			'obs',
			'schedule_obs',
			'date_expiration',
		])

		const unityData = await Unity.where({
			...data,
			name: data.name,
			name_company: data.name,
			active: true,
		})

		if (unityData) {
			return response.status(400).send({
				error: {
					message: 'Esta unidade já está cadastrada.',
				},
			})
		}

		const unity = await Unity.create({ ...data, active: true })

		return unity
	}

	public async update(ctx: HttpContextContract) {
		return adaptRoute(makeUnityUpdateByIdComposer(), ctx)
	}

	public async show(ctx: HttpContextContract) {
		return adaptRoute(makeUnityShowByIdComposer(), ctx)
	}

	public async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeUnityDeleteByIdComposer(), ctx)
	}
}

export default UnityController
