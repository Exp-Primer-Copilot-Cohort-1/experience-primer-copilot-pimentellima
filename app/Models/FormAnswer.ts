import Mongoose, { Schema } from '@ioc:Mongoose'
import { IFormAnswer } from 'Types/IFormAnswer'

const FormAnswerSchema = new Schema<IFormAnswer>({
	form: {
		id: { type: Mongoose.Types.ObjectId, required: true },
		name: { type: String, required: true },
	},
	activity_id: { type: Mongoose.Types.ObjectId, required: true },
	prof: {
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		_id: false,
	},
	profs_with_access: [
		{
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			_id: false,
		},
	],
	field_answers: [
		{
			question: {
				type: String,
				required: true,
			},
			answer: {
				type: String,
				required: true,
			},
			_id: false,
		},
	],
})

export default Mongoose.model<IFormAnswer>('form_answer', FormAnswerSchema, 'clients')
