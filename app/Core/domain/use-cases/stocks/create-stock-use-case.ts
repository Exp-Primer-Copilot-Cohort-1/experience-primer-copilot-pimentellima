import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { isBefore, isSameDay } from 'date-fns'

import Stock from 'App/Models/Stock'
import { IStock } from 'App/Types/IStock'
import { injectable, registry } from 'tsyringe'
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

@injectable()
@registry([{ token: CreateStockUseCase, useClass: CreateStockUseCase }])
export class CreateStockUseCase implements UseCase<IStock, IStock> {
	constructor(

	) { } // eslint-disable-line

	public async execute(
		{
			_id,
			unity_id,
			...data
		}: IStock,
	): PromiseEither<AbstractError, IStock> {

		const parsedData = stockSchema.parse(data)

		const stocks = await Stock.create({
			...parsedData,
			unity_id,
			active: true,
		})

		return right(stocks.toObject())
	}
}
