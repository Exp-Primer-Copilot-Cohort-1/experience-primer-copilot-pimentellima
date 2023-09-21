import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CostCenter, { COLLECTION_NAME } from 'App/Models/CostCenter'
import LogDecorator, { ACTION } from '../Decorators/Log'

class CostCenterController {
	async index({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const costCenters = await CostCenter.find({
			unity_id: userLogged?.unity_id,
			active: true,
		})

		return costCenters
	}

	async inatives({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const costCenters = await CostCenter.find({
			unity_id: userLogged?.unity_id,
			active: false,
		})

		return costCenters
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.only(['name'])
		const costCenters = await CostCenter.create({
			...data,
			active: true,
			unity_id: userLogged?.unity_id,
		})
		return costCenters
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request }: HttpContextContract) {
		const data = request.only(['name', 'active'])
		const costCenters = await CostCenter.findByIdAndUpdate(params.id, data).orFail()

		return { ...costCenters.toObject(), ...data }
	}

	async show({ params }: HttpContextContract) {
		const costCenters = await CostCenter.findById(params.id).orFail()

		return costCenters
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const costCenters = await CostCenter.findByIdAndDelete(params.id).orFail()
		return costCenters
	}
}

export default CostCenterController
