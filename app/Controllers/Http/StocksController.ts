import Stock from 'App/Models/Stock'

class StocksController {
	async index({ auth, request }) {
		const params = request.qs()

		const active = params.active === 'false' ? false : true

		const userLogged = auth.user
		const stocks = Stock.where({
			unity_id: userLogged.unity_id,
			active,
		})

		return stocks
	}

	async show({ params }) {
		const stocks = await Stock.findById(params.id)

		return stocks
	}

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.only([
			'name',
			'price_cost',
			'price_final',
			'quantity',
			'quantity_add',
			'date_batch',
			'batch',
			'stock_automatic',
			'quantity_minimun',
		])

		const stocks = await Stock.create({
			...data,
			active: true,
			quantity: data.quantity_add,
			unity_id: userLogged.unity_id,
		})

		return stocks
	}

	async destroy({ params }) {
		await Stock.findByIdAndDelete({ _id: params.id }).orFail()
	}

	async update({ params, request }) {
		const data = request.all()
		const stock = await Stock.findByIdAndUpdate(params.id, data, {
			new: true,
		}).orFail()
		return stock
	}
}

export default StocksController
