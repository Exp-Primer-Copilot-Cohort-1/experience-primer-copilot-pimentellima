import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import Activity, { COLLECTION_NAME } from 'App/Models/Activity'
import Procedure from 'App/Models/Procedure'
import Stock from 'App/Models/Stock'
import { IActivity } from 'App/Types/IActivity'
import { IStock } from 'App/Types/IStock'

type Props = {
	id: string
	status: AppointmentStatus
}

export class UpdateActivityStatusByIdUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityStatusById(
				params.id,
				params.status,
			)

		if (updatedActivityOrErr.isLeft()) return left(updatedActivityOrErr.extract())

		if (params.status === AppointmentStatus.COMPLETED) {
			const activity = await Activity.findById(params.id)
			if (!activity) return left(new AbstractError('', 500))
			const stocksData = await Stock.find()
			const proceduresData = await Procedure.find({
				_id: {
					$in: activity.procedures.map((p) => p.info.value),
				},
			})
			const productsWithQuantities = new Object()
			activity.procedures.forEach((procedure) => {
				const products = proceduresData.find(
					(p) => p._id.toString() === procedure.info.value,
				)?.products

				if (!products) return
				products.forEach((product) => {
					const productData = stocksData.find(
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
						.find((stock) => stock._id.toString() === key)
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
		}

		return right(updatedActivityOrErr.extract())
	}
}
