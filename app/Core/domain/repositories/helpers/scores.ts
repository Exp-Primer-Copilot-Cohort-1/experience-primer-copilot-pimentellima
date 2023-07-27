import Activity from 'App/Models/Activity'
import type { ObjectId } from 'mongoose'

type Scores = {
	[key: string]: number
}

export async function generateScores(unity_id: ObjectId): Promise<Scores> {
	const scores: Scores[] = await Activity.aggregate([
		{
			$match: {
				type: 'marked',
				unity_id: unity_id,
				date: { $lte: new Date() },
				scheduled: { $in: ['completed', 'canceled_client'] },
			},
		},
		{
			$group: {
				_id: '$client.value',
				label: { $first: '$client.label' },
				total: { $sum: 1 },
				canceled: {
					$sum: {
						$cond: [{ $eq: ['$scheduled', 'canceled_client'] }, 1, 0],
					},
				},
			},
		},
		{
			$project: {
				_id: 1,
				label: 1,
				score: {
					$subtract: [
						100,
						{
							$round: [
								{
									$multiply: [
										{ $divide: ['$canceled', '$total'] },
										100,
									],
								},
								2,
							],
						},
					],
				},
			},
		},
	])

	// Converte a pontuação em um objeto para facilitar a pesquisa
	const scoreMap: Scores = {}
	for (const item of scores) {
		scoreMap[item._id] = item.score
	}

	return scoreMap
}
