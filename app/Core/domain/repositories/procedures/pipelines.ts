import { makeMongoObjectId } from "App/Core/infra/create-id"

export const makePipelineBasicProcedure = (id: string, health_insurance_id: string) => {
	const pipeline = [
		{
			$match: {
				_id: makeMongoObjectId(id),
			},
		},
		{
			$unwind: {
				path: '$health_insurances',
			},
		},
		{
			$lookup: {
				from: 'health_insurances',
				localField: 'health_insurances._id',
				foreignField: '_id',
				as: 'health_insurances_data',
				pipeline: [
					{
						$project: {
							_id: 0,
							name: 1,
							price: 1,
						},
					}
				]
			},
		},
		{
			$match: {
				'health_insurances._id': makeMongoObjectId(health_insurance_id),
			},
		},
		{
			$unwind: {
				path: '$health_insurances_data',
			},
		},
		{
			$project: {
				_id: 0,
				price: '$health_insurances.price',
				health_insurance: '$health_insurances_data.name',
				name: 1,
				color: 1,
				minutes: 1,
			},
		},
	]



	return pipeline
}