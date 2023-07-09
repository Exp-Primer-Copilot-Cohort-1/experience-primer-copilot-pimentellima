import { Schema } from '@ioc:Mongoose'

export const HolidaySchemaHelper = new Schema(
	{
		name: { type: String, required: true },
		date: { type: String, required: true, match: /\d{4}-\d{2}-\d{2}/ },
		type: { type: String, required: true },
	},
	{
		timestamps: false,
		_id: true,
	},
)
