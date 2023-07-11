import Procedure from 'App/Models/Procedure'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, it } from 'vitest'

const ObjectId = mongoose.Types.ObjectId

describe('Get Intersections Health Plans Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})

	it('should add holidays by unity', async () => {
		const professionalId = new ObjectId('6359660fc109b232759921d6')
		const procedureId = new ObjectId('6363ca3ac109b232759921f3')

		const pipeline = [
			{
				$match: {
					_id: { $in: [professionalId, procedureId] },
				},
			},
			{
				$lookup: {
					from: 'health_insurances',
					localField: 'prof.value',
					foreignField: 'profs.value',
					as: 'health_plans',
				},
			},
			{
				$unwind: '$health_insurances',
			},
			{
				$group: {
					_id: '$health_insurances._id',
					count: { $sum: 1 },
					healthPlan: { $first: '$health_insurances' },
				},
			},
			{
				$match: {
					count: 2,
				},
			},
			{
				$replaceRoot: {
					newRoot: '$healthPlan',
				},
			},
		]

		const result = await Procedure.aggregate(pipeline).exec()

		console.log(result)
	})
})
