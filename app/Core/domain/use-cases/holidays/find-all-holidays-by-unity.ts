import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'Types/IHoliday'
import { HolidaysManagerInterface } from '../../repositories/interface/holidays.interface'

type Unity = {
	unity_id: string
	year?: number
}

export class FindAllHolidaysByUnityUseCase implements UseCase<Unity, IHoliday[]> {
	constructor(
		private readonly holidaysRepository: HolidaysManagerInterface,
		private readonly SaveHolidayNationalsUseCase: UseCase<number, IHoliday[]>,
	) { }

	public async execute({
		unity_id,
		year = new Date().getFullYear(),
	}: Unity): PromiseEither<AbstractError, IHoliday[]> {
		const holidaysOrErr = await this.holidaysRepository.findAllHolidays(unity_id)

		if (holidaysOrErr.isLeft()) {
			return left(new AbstractError('Error to find holidays', 400))
		}

		const holidays = holidaysOrErr.extract()

		const holidaysNationalsOrErr = await this.SaveHolidayNationalsUseCase.execute(
			year,
		)

		if (holidaysNationalsOrErr.isLeft()) {
			return left(new AbstractError('Error to find holidays nationals', 400))
		}

		const holidaysNationals = holidaysNationalsOrErr.extract()

		return right([...holidays, ...holidaysNationals])
	}
}
