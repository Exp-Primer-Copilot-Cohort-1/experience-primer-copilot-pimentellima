import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

export default function generateMatch({ date_start, date_end, unity_id, prof_id }) {
	const match = {
		date: {
			$gte: new Date(date_start),
			$lte: new Date(date_end),
		},
		unity_id: new ObjectId(unity_id),
	}

	if (prof_id) match['prof_id'] = new ObjectId(prof_id)

	return match
}
