import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPrescription } from 'Types/IPrescription'

interface IPrescriptionModel extends Omit<IPrescription, 'prof'> {
	prof: Schema.Types.ObjectId
}

const PrescriptionSchema = new Schema<IPrescriptionModel>(
	{
		name: {
			type: String,
			required: true,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
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

PrescriptionSchema.index({ unity_id: 1, prof: 1 }, { unique: false })

export default Mongoose.model<IPrescriptionModel>('prescriptions', PrescriptionSchema)
