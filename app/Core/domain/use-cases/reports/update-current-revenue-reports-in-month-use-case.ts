import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import { IBilling } from 'Types/IBilling'
import mongoose from 'mongoose'
import { ReportsUnitiesManagerInterface } from '../../repositories/interface/reports-unities-manager.interface'

const ObjectId = mongoose.Types.ObjectId

type UnityReportsRevenues = {
	unity_id: string
	month?: number
	year?: number
}

export class UpdateCurrentBillingInMonthUseCase
	implements UseCase<UnityReportsRevenues, IBilling>
{
	constructor(private readonly manager: ReportsUnitiesManagerInterface) { }

	public async execute({
		unity_id,
		month = new Date().getMonth(),
		year = new Date().getFullYear(),
	}: UnityReportsRevenues): PromiseEither<AbstractError, IBilling> {
		const pipeline = [
			{
				$addFields: {
					convertedDate: {
						$dateFromString: {
							dateString: '$payment.date',
							format: '%Y-%m-%d',
						},
					},
					value: {
						$convert: {
							input: {
								$replaceOne: {
									input: '$payment.value',
									find: ',',
									replacement: '.',
								},
							},
							to: 'double',
						},
					},
				},
			},
			{
				$project: {
					month: { $month: '$convertedDate' },
					year: { $year: '$convertedDate' },
				},
			},
			{
				$match: {
					unity_id: new ObjectId(unity_id),
				},
			},
		]

		const result = await Activity.aggregate(pipeline)

		console.log(result)

		if (!result) {
			return right(0)
		}

		return right(result)
	}
}
