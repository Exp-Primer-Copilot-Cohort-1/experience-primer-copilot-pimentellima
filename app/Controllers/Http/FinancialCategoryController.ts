import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FinancialCategory, { COLLECTION_NAME } from 'App/Models/FinancialCategory'
import LogDecorator, { ACTION } from '../Decorators/Log'

class FinancialCategoryController {
	async index({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const categories = FinancialCategory.find({
			unity_id: userLogged?.unity_id,
			active: true,
		})

		return categories
	}

	async inatives({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const categories = FinancialCategory.find({
			unity_id: userLogged?.unity_id,
			active: false,
		})

		return categories
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store({ request, response, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.only(['name', 'type', 'sub_categories'])
		const categoryData = await FinancialCategory.findOne({ name: data.name })
		if (categoryData && categoryData.active) {
			return response.status(400).send({
				error: {
					message: 'Esta categoria já está cadastrada.',
				},
			})
		}
		const category = await FinancialCategory.create({
			...data,
			active: true,
			unity_id: userLogged?.unity_id,
		})
		return category
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request }: HttpContextContract) {
		const data = request.only(['name', 'type', 'sub_categories', 'active'])

		const category = await FinancialCategory.findByIdAndUpdate(
			params.id,
			data,
		).orFail()

		return { ...category.toObject(), ...data }
	}

	async show({ params }: HttpContextContract) {
		const category = await FinancialCategory.where({ _id: params.id }).orFail()

		return category
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const category = await FinancialCategory.findByIdAndDelete(params.id).orFail()
		await category
	}
}

export default FinancialCategoryController
