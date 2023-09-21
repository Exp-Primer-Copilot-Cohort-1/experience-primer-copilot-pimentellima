import Mongoose, { Schema } from '@ioc:Mongoose'
import { IScheduleBlock } from 'App/Types/IScheduleBlock'

export const COLLECTION_NAME = 'schedule_block'

const ScheduleBlockSchema = new Schema<IScheduleBlock>(
	{
		date: {
			type: Date,
			required: true,
		},
		hour_start: {
			type: String,
			required: true,
		},
		hour_end: {
			type: String,
			required: true,
		},
		obs: {
			type: String,
			required: false,
			default: '',
		},
		all_day: {
			type: Boolean,
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

export default Mongoose.model<IScheduleBlock>(COLLECTION_NAME, ScheduleBlockSchema)
