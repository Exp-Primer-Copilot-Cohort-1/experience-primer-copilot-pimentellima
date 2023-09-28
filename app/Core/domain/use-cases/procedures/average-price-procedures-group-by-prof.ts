import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Procedure from 'App/Models/Procedure'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export type AverageProcedureProps = {
	unity_id: string
}

export type AverageProf = {
	label: string
	value: string
	avgPrice: number
}

export class AveragePriceProceduresUseCase
	implements UseCase<AverageProcedureProps, Partial<AverageProf>[]>
{
	constructor() { }

	public async execute({
		unity_id,
	}: AverageProcedureProps): PromiseEither<AbstractError, Partial<AverageProf>[]> {
		const pipeline = [
			{
				$match: {
					unity_id: new ObjectId(unity_id),
				},
			},
			{
				$unwind: '$health_insurances',
			},
			{
				$lookup: {
					from: "users",
					localField: "profs",
					foreignField: "_id",
					as: "profs",
					pipeline: [
						{
							$project: {
								_id: 0,
								value: '$_id',
								label: '$name',
							}
						}
					]
				}
			},
			{
				$unwind: '$profs',
			},
			{
				$group: {
					_id: '$profs',
					avgPrice: { $avg: '$health_insurances.price' },
				},
			},
			{
				$project: {
					_id: 0,
					label: '$_id.label',
					value: '$_id.value',
					avgPrice: 1,
				},
			},
		]

		const result: AverageProf[] = await Procedure.aggregate(pipeline)

		return right(result)
	}
}
