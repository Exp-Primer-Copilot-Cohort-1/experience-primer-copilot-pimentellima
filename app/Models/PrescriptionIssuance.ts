import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPrescriptionIssuance } from 'App/Types/IPrescriptionIssuance'
import { COLLECTION_NAME as COLLECTION_NAME_UNITY } from './Unity'

export const COLLECTION_NAME = 'prescription_issuances'

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
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_UNITY
		},
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
	COLLECTION_NAME,
	PrescriptionIssuance,
)
