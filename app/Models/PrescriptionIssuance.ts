import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPrescriptionIssuance } from 'App/Types/IPrescriptionIssuance'

const PrescriptionIssuance = new Schema<IPrescriptionIssuance>(
	{
		client: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		prescription: {
			name: { type: String, required: true },
			text: { type: String, required: true },
		},
		date: { type: Date, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

PrescriptionIssuance.index({ unity_id: 1, 'client.value': 1 }, { unique: false })

export default Mongoose.model<IPrescriptionIssuance>(
	'prescription_issuances',
	PrescriptionIssuance,
)
