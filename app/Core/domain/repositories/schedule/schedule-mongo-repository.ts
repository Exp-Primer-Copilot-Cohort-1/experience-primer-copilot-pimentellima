import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import User from 'App/Models/User'
import { IUser } from 'App/Types/IUser'
import { MissingParamsError } from '../../errors/missing-params'
import { ScheduleManagerInterface } from '../interface/schedule-manager-interface'

type Schedule = {
	hourStartDay: string
	hourEndDay: string
	hourStartLunch: string
	hourEndLunch: string
}

export class ScheduleMongoRepository implements ScheduleManagerInterface {
	async getWorkHours(prof_id: string): PromiseEither<AbstractError, Schedule> {
		if (!prof_id) return left(new MissingParamsError('prof_id'))
		const prof = (await User.findById(prof_id)) as IUser
		if (!prof) return left(new AbstractError('Could not find professional', 404))

		return right({
			hourStartDay: prof.hour_start,
			hourEndDay: prof.hour_end,
			hourStartLunch: prof.hour_start_lunch,
			hourEndLunch: prof.hour_end_lunch,
		})
	}
}
