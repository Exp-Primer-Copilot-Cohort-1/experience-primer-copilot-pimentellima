import Ingredient from 'App/Models/Ingredient'

import mongoose from 'mongoose'

class IngredientController {
	async index({ request, auth }) {
		const userLogged = auth.user
		const ingredients = await Ingredient.where({
			unity_id: userLogged.unity_id,
		})

		return ingredients
	}

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.only(['name', 'description', 'user_id', 'ingredient_id'])

		const ingredients = await Ingredient.create({
			...data,
			active: true,
			unity_id: new mongoose.Types.ObjectId(userLogged.unity_id),
			client_id: new mongoose.Types.ObjectId(data.user_id),
			ingredient_id: new mongoose.Types.ObjectId(data.ingredient_id),
		})

		return ingredients
	}

	async update({ params, request }) {
		const data = request.all()
		const ingredients = await Ingredient.findByIdAndUpdate(params.id, data, {
			new: true,
		})

		return ingredients
	}

	async show({ params }) {
		const ingredients = await Ingredient.where({ _id: params.id }).orFail()

		return ingredients
	}

	async destroy({ params }) {
		const ingredients = await Ingredient.findByIdAndDelete(params.id).orFail()
		return ingredients
	}
}

export default IngredientController
