import { ProfsMongooseRepository } from 'App/Core/domain/repositories'
import { ProfsManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { IUser } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'
import { FindAllHolidaysByUnityParams } from '../../helpers/holidays'
import { FindAllHolidaysByUnityUseCase } from '../../holidays'

export type In = {
	_id: string
	unity_id: string
	day: number
	month: number
	year: number
}

const getDaysCount = (
	year: number,
	month: number,
	day: number,
	days: IUser,
	holidays: IHoliday[],
) => {
	const date = new Date(year, month, day)
	let counter = 0

	const dayOfWeek = [
		'is_sunday',
		'is_monday',
		'is_tuesday',
		'is_wednesday',
		'is_thursday',
		'is_friday',
		'is_saturday',
	]

	while (date.getMonth() === month) {
		const day = date.getDay()
		if (days[dayOfWeek[day]]) {
			// verifica se o dia não é bate em um feriado
			const isHoliday = holidays?.find((holiday) => {
				const holidayDate = new Date(holiday.date)
				return holidayDate.getDate() === date.getDate()
			})

			if (!isHoliday) counter++
		}
		date.setDate(date.getDate() + 1)
	}

	return counter
}

const filterHolidays = (holidays: IHoliday[], month: number) => {
	return holidays.filter((holiday) => {
		const date = new Date(holiday.date)
		return date.getMonth() === month
	})
}

const hoursToDays = (schedule: IUser) => {
	// converter o horário em milissegundos
	const hour_end_ms = new Date(schedule.hour_end).getTime()
	const hour_end_lunch_ms = new Date(schedule.hour_end_lunch).getTime()
	const hour_start_ms = new Date(schedule.hour_start).getTime()
	const hour_start_lunch_ms = new Date(schedule.hour_start_lunch).getTime()

	// calcular a diferença em milissegundos
	const work_ms =
		hour_end_ms - hour_start_ms - (hour_end_lunch_ms - hour_start_lunch_ms)

	// converter para horas
	return work_ms / (1000 * 60 * 60)
}

@injectable()
@registry([{ token: DayTradesByProfUseCase, useClass: DayTradesByProfUseCase }])
export class DayTradesByProfUseCase implements UseCase<In, Hours> {

	constructor(
		@inject(ProfsMongooseRepository) private readonly manager: ProfsManagerContract,
		@inject(FindAllHolidaysByUnityUseCase) private readonly holidaysUseCase: UseCase<
			FindAllHolidaysByUnityParams,
			IHoliday[]
		>,
	) { }

	public async execute({
		_id,
		unity_id,
		day = new Date().getDate(),
		year = new Date().getFullYear(),
		month = new Date().getMonth(),
	}: In): PromiseEither<AbstractError, Hours> {
		// const data = await getHolidayByMonth(prof.month, prof.year.toLocaleString())

		const [profOrErr, holidaysOrErr] = await Promise.all(
			[
				this.manager.findById(_id),
				this.holidaysUseCase.execute({
					unity_id,
					year,
				})
			]
		)

		if (profOrErr.isLeft()) return left(profOrErr.extract())
		if (holidaysOrErr.isLeft()) return left(holidaysOrErr.extract())

		const holidays = filterHolidays(holidaysOrErr.extract(), month)
		const prof = profOrErr.extract()

		const count = getDaysCount(year, month, day, prof, holidays)
		const hours = hoursToDays(prof)
		return right(count * hours || 0)
	}
}
