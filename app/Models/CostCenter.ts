import { Schema, model } from '@ioc:Mongoose'
import { ICostCenter } from 'Types/ICostCenter'

const CostCenterSchema = new Schema<ICostCenter>(
	{
		name: { type: String, required: true },
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<ICostCenter>('cost_centers', CostCenterSchema)
