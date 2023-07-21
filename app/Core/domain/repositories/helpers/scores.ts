import Activity from 'App/Models/Activity'
import type { ObjectId } from 'mongoose'

export async function generateScores(unity_id: ObjectId) {
	const scores = await Activity.aggregate([
		{
			$match: {
				type: 'marked',
				unity_id: unity_id,
				date: { $lte: new Date() },
			},
		},
		{
			$group: {
				_id: '$client.value',
				total: { $sum: 1 },
				completed: {
					$sum: { $cond: [{ $eq: ['$scheduled', 'completed'] }, 1, 0] },
				},
			},
		},
		{
			$project: {
				_id: 1,
				score: { $divide: ['$completed', '$total'] },
			},
		},
	])

	// Converte a pontuação em um objeto para facilitar a pesquisa
	const scoreMap = {}
	for (const score of scores) {
		scoreMap[score._id] = score.score
	}

	return scoreMap
}
