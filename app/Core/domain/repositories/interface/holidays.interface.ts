import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IHoliday } from 'App/Types/IHoliday'

export interface HolidaysManagerInterface {
	findAllHolidays: (unity_id: string) => PromiseEither<AbstractError, IHoliday[]>
	deleteHoliday: (
		unity_id: string,
		id: string,
	) => PromiseEither<AbstractError, IHoliday[]>
	addHoliday: (
		unity_id: string,
		holiday: IHoliday,
	) => PromiseEither<AbstractError, IHoliday>
}
