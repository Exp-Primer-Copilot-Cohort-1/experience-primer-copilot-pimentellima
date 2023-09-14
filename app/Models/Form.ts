import Mongoose, { Schema } from '@ioc:Mongoose'
import { IForm } from 'App/Types/IForm'

const FormSchema = new Schema<IForm>(
	{
		name: {
			type: String,
			required: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			required: true,
		},
		prof: [
			{
				value: {
					type: String,
					required: true,
				},
				label: {
					type: String,
					required: true,
				},
				_id: false
			},
		],
		fields: [{}],
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		timestamps: true,
	},
)

FormSchema.index({ unity_id: 1 }, { unique: false })

export default Mongoose.model<IForm>('forms', FormSchema)
