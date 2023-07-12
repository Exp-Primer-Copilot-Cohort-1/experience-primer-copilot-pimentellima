import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Procedure from 'App/Models/Procedure'
import { IProcedure } from 'Types/IProcedure'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export type AverageProcedureProps = {
	unity_id: string
}

export class AveragePriceProceduresUseCase
	implements UseCase<AverageProcedureProps, Partial<IProcedure>[]>
{
	constructor() { }

	public async execute({
		unity_id,
	}: AverageProcedureProps): PromiseEither<AbstractError, Partial<IProcedure>[]> {
		const pipeline = [
			{
				$match: {
					unity_id: new ObjectId(unity_id),
				},
			},
			{
				$unwind: '$health_insurance',
			},
			{
				$unwind: '$prof',
			},
			{
				$addFields: {
					'health_insurance.priceNumber': {
						$convert: {
							input: {
								$replaceOne: {
									input: '$health_insurance.price',
									find: ',',
									replacement: '.',
								},
							},
							to: 'double',
						},
					},
				},
			},
			// {
			// 	$group: {
			// 		_id: '$_id',
			// 		name: { $first: '$name' },
			// 		profs: { $first: '$prof' },
			// 		avgPrice: { $avg: '$health_insurance.priceNumber' },
			// 		unity_id: { $first: '$unity_id' },
			// 	},
			// },
			// {
			// 	$group: {
			// 		_id: {
			// 			id: '$_id',
			// 			prof: '$prof.value',
			// 		},
			// 		name: { $first: '$name' },
			// 		prof: { $first: '$prof' },
			// 		avgPrice: { $avg: '$health_insurance.priceNumber' },
			// 		unity_id: { $first: '$unity_id' },
			// 	},
			// },
			{
				$group: {
					_id: '$prof.value',
					prof: { $first: '$prof.label' },
					avgPrice: { $avg: '$health_insurance.priceNumber' },
					unity_id: { $first: '$unity_id' },
				},
			},
		]

		const result = await Procedure.aggregate(pipeline)

		return right(result)
	}
}
