import Mongoose, { Schema } from '@ioc:Mongoose'
import { IHoliday } from 'Types/IHoliday'

type YearHoliday = {
	year: number
	holidays: IHoliday[]
}

const HolidaysNationalsSchema = new Schema<YearHoliday>(
	{
		year: { type: Number, required: true },
		holidays: [
			{
				name: { type: String, required: true },
				date: { type: String, required: true, match: /\d{4}-\d{2}-\d{2}/ },
				type: { type: String, required: true },
			},
		],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<YearHoliday>('holidays_nationals', HolidaysNationalsSchema)
