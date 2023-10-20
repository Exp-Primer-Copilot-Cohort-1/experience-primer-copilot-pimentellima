import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCounts, makeFindAll } from 'App/Core/composers'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import Stock, { COLLECTION_NAME } from 'App/Models/Stock'
import { isBefore, isSameDay } from 'date-fns'
import { z } from 'zod'

function sortBatchesByDate(a: string | undefined, b: string | undefined): number {
	if (typeof a === 'undefined') return 1
	if (typeof b === 'undefined') return -1
	if (isBefore(new Date(a), new Date(b))) return -1
	if (isSameDay(new Date(a), new Date(b))) return 0
	else return 1
}

const stockSchema = z
	.object({
		name: z.string(),
		batches: z
			.array(
				z.object({
					name: z.string().optional(),
					quantity: z.number(),
					minimum_quantity: z.number(),
					date_batch: z.string().optional(),
					price_cost: z.string(),
					price_final: z.string(),
				}),
			)
			.transform((arr) =>
				arr.sort((a, b) => sortBatchesByDate(a.date_batch, b.date_batch)),
			),
		single_lot: z.boolean(),
		stock_automatic: z.boolean(),
	})
	.refine((schema) => {
		if (schema.single_lot && schema.batches.length !== 1) return false
		if (schema.single_lot) return true
		for (let i = 0; i < schema.batches.length; i++) {
			const batch = schema.batches[i]
			if (!batch.date_batch || !batch.name) return false
		}
		return true
	})

class StocksController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAll(ctx, COLLECTION_NAME), ctx)
	}

	async show({ params }) {
		const stocks = await Stock.findById(params.id)

		return stocks
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.all()

		const parsedData = stockSchema.parse(data)

		const stocks = await Stock.create({
			...parsedData,
			active: true,
			unity_id: userLogged.unity_id,
		})

		return stocks
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }) {
		await Stock.findByIdAndDelete({ _id: params.id }).orFail()
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActive({ params, request }) {
		const { active } = request.only(['active'])

		const stock = await Stock.findByIdAndUpdate(params.id, {
			$set: {
				active,
			},
			new: true,
		})
		return stock
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request }) {
		const data = request.all()

		const parsedData = stockSchema.parse(data)

		const stock = await Stock.findByIdAndUpdate(params.id, parsedData, {
			new: true,
		}).orFail()
		return stock
	}

	async counts(ctx: HttpContextContract) {
		return adaptRoute(makeCounts(ctx, COLLECTION_NAME), ctx)
	}
}

export default StocksController
