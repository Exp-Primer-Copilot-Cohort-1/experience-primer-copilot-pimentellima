import Mongoose, { Schema } from '@ioc:Mongoose'
import { ICostCenter } from 'App/Types/ICostCenter'
import { COLLECTION_NAME as COLLECTION_UNITIES_NAME } from './Unity'

export const COLLECTION_NAME = 'cost_centers'

const CostCenterSchema = new Schema<ICostCenter>(
	{
		name: { type: String, required: true },
		active: { type: Boolean, required: true },
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITIES_NAME,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

CostCenterSchema.index({ unity_id: 1 }, { unique: true })

export default Mongoose.model<ICostCenter>(COLLECTION_NAME, CostCenterSchema)
