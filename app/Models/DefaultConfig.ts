import Mongoose, { Schema } from '@ioc:Mongoose'
import { IDefaultConfig } from 'Types/IDefaultConfig'

const DefaultConfigSchema = new Schema<IDefaultConfig>(
	{
		bank: {
			type: {
				value: Schema.Types.ObjectId,
				label: String,
			},
			required: true,
		},
		cost_center: {
			type: {
				value: Schema.Types.ObjectId,
				label: String,
			},
			required: true,
		},
		payment_form: {
			type: {
				value: Schema.Types.ObjectId,
				label: String,
				key: String,
			},
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

export default Mongoose.model<IDefaultConfig>('unities', DefaultConfigSchema)
