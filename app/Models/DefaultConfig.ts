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
		active: {
			type: Boolean,
			required: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
			unique: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IDefaultConfig>('default_configs', DefaultConfigSchema)
