import { ProfManagerContract } from 'App/Core/domain/repositories/interface/prof-manage-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusIdlenessByProf } from 'App/Types/ICensus'
import { IHoliday } from 'App/Types/IHoliday'
import { IUser } from 'App/Types/IUser'
import { isWithinInterval } from 'date-fns'
import { FindAllHolidaysByUnityParams } from '../../helpers/holidays'

export type HoursWorked = number

export type DaysTradesIntervalDatesParams = {
	id: string
	unity_id: string
	name: string
	count: number
	date_start?: string
	date_end?: string
}

const getDaysCount = (
	date_start: Date,
	date_end: Date,
	days: IUser,
	holidays: IHoliday[],
) => {
	let counter = 0
	const date = new Date(date_start.toISOString())

	const dayOfWeek = [
		'is_sunday',
		'is_monday',
		'is_tuesday',
		'is_wednesday',
		'is_thursday',
		'is_friday',
		'is_saturday',
	]

	while (
		isWithinInterval(date, {
			start: date_start,
			end: date_end,
		})
	) {
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

const filterHolidays = (holidays: IHoliday[], date_start: Date, date_end: Date) => {
	return holidays.filter((holiday) => {
		const date = new Date(holiday.date)
		return isWithinInterval(date, {
			start: date_start,
			end: date_end,
		})
	})
}

const minutesWorked = (schedule: IUser): HoursWorked => {
	// converter o horário em milissegundos
	const hour_end_ms = new Date(schedule.hour_end).getTime()
	const hour_end_lunch_ms = new Date(schedule.hour_end_lunch).getTime()
	const hour_start_ms = new Date(schedule.hour_start).getTime()
	const hour_start_lunch_ms = new Date(schedule.hour_start_lunch).getTime()

	// calcular a diferença em milissegundos
	const work_ms =
		hour_end_ms - hour_start_ms - (hour_end_lunch_ms - hour_start_lunch_ms)

	// converter para minutos
	return work_ms / (1000 * 60)
}

export class DayTradesIntervalDatesByProfUseCase
	implements UseCase<DaysTradesIntervalDatesParams, ICensusIdlenessByProf>
{
	constructor(
		private readonly managerProfs: ProfManagerContract,
		private readonly holidaysUseCase: UseCase<
			FindAllHolidaysByUnityParams,
			IHoliday[]
		>,
	) { }

	public async execute({
		id,
		unity_id,
		date_start,
		date_end,
		count,
		name,
	}: DaysTradesIntervalDatesParams): PromiseEither<
		AbstractError,
		ICensusIdlenessByProf
	> {
		const now = new Date()

		const startDate = date_start
			? new Date(date_start)
			: new Date(now.getFullYear(), now.getMonth(), 1)

		const endDate = date_end
			? new Date(date_end)
			: new Date(now.getFullYear(), now.getMonth() + 1, 0)

		const profOrErr = await this.managerProfs.findByID(id, unity_id)
		const holidaysOrErr = await this.holidaysUseCase.execute({
			unity_id,
			year: startDate.getFullYear(),
		})

		if (profOrErr.isLeft()) return left(profOrErr.extract())
		if (holidaysOrErr.isLeft()) return left(holidaysOrErr.extract())

		const holidays = filterHolidays(holidaysOrErr.extract(), startDate, endDate)
		const prof = profOrErr.extract()

		const days = getDaysCount(startDate, endDate, prof, holidays) // retorna a quantidade de dias trabalhados
		const minutes = minutesWorked(prof) // retorna a quantidade de horas que deveriam ser trabalhadas

		const hasMinutesWorked = days * minutes || 0

		const idleness = (hasMinutesWorked - count) / 60 // retorna a quantidade de horas de ociosidade

		return right({
			value: id,
			label: name,
			idleness,
		})
	}
}
