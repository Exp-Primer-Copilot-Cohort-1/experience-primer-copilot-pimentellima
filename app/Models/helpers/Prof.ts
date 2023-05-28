import { Schema } from '@ioc:Mongoose'

export const ProfSchemaHelper = new Schema(
	{
		value: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users',
		},
		label: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'users',
		timestamps: false,
		_id: false,
	},
)
