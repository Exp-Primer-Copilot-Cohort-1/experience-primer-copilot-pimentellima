import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerAttendanceInterface, ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Activity, { COLLECTION_NAME } from 'App/Models/Activity'
import Procedure from 'App/Models/Procedure'
import Stock from 'App/Models/Stock'
import { IActivity } from 'App/Types/IActivity'
import { IStock } from 'App/Types/IStock'
import { ActivityNotFoundError } from '../../errors/activity-not-found'

type Props = {
	id: string
	finished_at: Date
}

export class UpdateActivityFinishedAtUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activityAttendanceManager: ActivitiesManagerAttendanceInterface,
		private readonly activityManager: ActivitiesManagerInterface
	) {} // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		/* const activity = await this.activityManager.findActivityById(params.id)
		if (!activity) return left(new ActivityNotFoundError())
		if (activity.isLeft()) return left(activity.extract())
		const extractedActivity = activity.extract()
		const stocksData = await Stock.find()
		const proceduresData = await Procedure.find({
			_id: {
				$in: extractedActivity.procedures.map((p) => p.info.value),
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

		const updatedActivityOrErr =
			await this.activityAttendanceManager.updateActivityFinishedAt(
				params.id,
				params.finished_at,
			)

		if (updatedActivityOrErr.isLeft()) return left(updatedActivityOrErr.extract())
		return right(updatedActivityOrErr.extract())
	}
}
