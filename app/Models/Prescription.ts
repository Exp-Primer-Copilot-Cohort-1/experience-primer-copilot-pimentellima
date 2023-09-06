import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPrescription } from 'Types/IPrescription'

const PrescriptionSchema = new Schema<IPrescription>(
	{
		name: {
			type: String,
			required: true,
		},
		prof: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
		},
		text: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

PrescriptionSchema.index({ unity_id: 1, name: 1, 'prof.value': 1 }, { unique: false })

export default Mongoose.model<IPrescription>(
	'prescriptions',
	PrescriptionSchema,
	'prescriptions',
)
