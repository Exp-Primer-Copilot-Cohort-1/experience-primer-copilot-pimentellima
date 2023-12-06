import { ActivityNotFoundError, IdNotProvidedError } from 'App/Core/domain/errors'
import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import {
	ActivitiesManagerContract
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Procedure from 'App/Models/Procedure'
import Stock from 'App/Models/Stock'
import { IStock } from 'App/Types/IStock'
import { Generic } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { IProductStockDepletionUseCase } from './use-cases.contract'

type In = {
	id: string
}

@injectable()
@registry([{ token: ProductStockDepletionUseCase, useClass: ProductStockDepletionUseCase }])
export class ProductStockDepletionUseCase implements IProductStockDepletionUseCase {

	constructor(
		@inject(ActivityMongoRepository)
		private readonly manager: ActivitiesManagerContract,
	) { } // eslint-disable-line

	public async execute({ id }: In): PromiseEither<AbstractError, Message> {
		if (!id) return left(new IdNotProvidedError())
		const activityOrErr = await this.manager.find(id)

		if (activityOrErr.isLeft()) return left(new ActivityNotFoundError())

		const activity = activityOrErr.extract()

		const stocksData = await Stock.find({
			unity_id: activity.unity_id,
		})

		const proceduresData = await Procedure.find({
			_id: {
				$in: activity.procedures?.map((p) => (p._id as Generic).value),
			},
		})

		const productsWithQuantities = new Object()

		activity.procedures.forEach((procedure) => {

			const products = proceduresData.find(
				(p) => p._id.toString() === (procedure._id as Generic).value.toString(),
			)?.products

			if (!products) return

			products.forEach((product) => {
				const productData = stocksData?.find(
					(stock) => stock._id.toString() === product.value.toString(),
				)

				if (!productData?.stock_automatic) return

				if (productsWithQuantities[product.value]) {
					productsWithQuantities[product.value] += product.quantity
				} else productsWithQuantities[product.value] = product.quantity
			})
		})

		await Promise.all(
			Object.keys(productsWithQuantities).map(async (key) => {
				const stock: IStock | undefined = stocksData
					?.find((stock) => stock._id.toString() === key)
					?.toObject()
				if (!stock?.batches.length) return
				let quantityLeft = productsWithQuantities[key]
				const batches: IStock['batches'] = []
				stock.batches.forEach((batch) => {
					if (quantityLeft === 0) {
						batches.push(batch)
					} else if (quantityLeft < batch.quantity) {
						batches.push({
							...batch,
							quantity: batch.quantity - quantityLeft,
						})
						quantityLeft = 0
					} else if (quantityLeft >= batch.quantity) {
						quantityLeft = quantityLeft - batch.quantity
					}
				})

				await Stock.findByIdAndUpdate(
					key,
					{
						$set: { batches },
					},
					{
						new: true,
						returnDocument: 'after',
					},
				)
			}),
		)

		return right({ message: 'ok', data: activity })
	}
}


// ! ORIGINAL
/* const activity = await this.activityManager.findActivityById(params.id)
		if (!activity) return left(new ActivityNotFoundError())
		if (activity.isLeft()) return left(activity.extract())
		const extractedActivity = activity.extract()
		const stocksData = await Stock.find()
		const proceduresData = await Procedure.find({
			_id: {
				$in: extractedActivity.procedures?.map((p) => p.info.value),
			},
		})
		const productsWithQuantities = new Object()
		extractedActivity.procedures.forEach((procedure) => {
			const products = proceduresData.find(
				(p) => p._id.toString() === procedure.info.value,
			)?.products

			if (!products) return
			products.forEach((product) => {
				const productData = stocksData?.find(
					(stock) => stock._id.toString() === product.value.toString(),
				)

				if (!productData?.stock_automatic) return

				if (productsWithQuantities[product.value]) {
					productsWithQuantities[product.value] += product.quantity
				} else productsWithQuantities[product.value] = product.quantity
			})
		})

		await Promise.all(
			Object.keys(productsWithQuantities).map(async (key) => {
				const stock: IStock | undefined = stocksData
					?.find((stock) => stock._id.toString() === key)
					?.toObject()
				if (!stock?.batches.length) return
				let quantityLeft = productsWithQuantities[key]
				const batches: IStock['batches'] = []
				stock.batches.forEach((batch) => {
					if (quantityLeft === 0) {
						batches.push(batch)
					} else if (quantityLeft < batch.quantity) {
						batches.push({
							...batch,
							quantity: batch.quantity - quantityLeft,
						})
						quantityLeft = 0
					} else if (quantityLeft >= batch.quantity) {
						quantityLeft = quantityLeft - batch.quantity
					}
				})

				await Stock.findByIdAndUpdate(
					key,
					{
						$set: { batches },
					},
					{
						new: true,
						returnDocument: 'after',
					},
				)
			}),
		) */