import { IStocksLog } from 'Types/IStocksLog'
import Mongoose, { Schema } from 'mongoose'

const StocksLogSchema = new Schema<IStocksLog>(
	{
		title: { type: String, required: true },
		stocks_id: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
		admin: {
			_id: { type: String, required: true },
			name: { type: String, required: true },
			email: { type: String, required: true },
			password: { type: String, required: true },
			unity_id: { type: String, required: true },
			type: { type: String, required: true },
			active: { type: Boolean, required: true },
			avatar: { type: String, required: true },
			due_date: { type: Date, default: null },
			created_at: { type: Date, required: true },
			updated_at: { type: Date, required: true },
			board: { type: String, default: null },
			celphone: { type: String, required: true },
			document: { type: String, required: true },
			exib_minutes: { type: Number, required: true },
			genre: { type: String, required: true },
			hour_end: { type: String, default: null },
			hour_end_lunch: { type: String, default: null },
			hour_start: { type: String, default: null },
			hour_start_lunch: { type: String, default: null },
			is_friday: { type: Boolean, required: true },
			is_monday: { type: Boolean, required: true },
			is_saturday: { type: Boolean, required: true },
			is_sunday: { type: Boolean, required: true },
			is_thursday: { type: Boolean, required: true },
			is_tuesday: { type: Boolean, required: true },
			is_wednesday: { type: Boolean, required: true },
			lunch_time_active: { type: Boolean, required: true },
			occupation_code: { type: String, default: null },
			phone: { type: String, default: null },
			profession: { type: String, default: null },
			record: { type: String, default: null },
			schedule_obs: { type: String, default: null },
			show_lack: { type: Boolean, required: true },
			specialty: { type: String, default: null },
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IStocksLog>('stockslogs', StocksLogSchema)
