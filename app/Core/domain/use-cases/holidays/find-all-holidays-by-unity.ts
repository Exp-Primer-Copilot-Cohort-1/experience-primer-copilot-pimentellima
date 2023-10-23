import { HolidaysManagerContract } from 'App/Core/domain/repositories/interface/holidays.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { FindAllHolidaysByUnityParams } from '../helpers/holidays'

export class FindAllHolidaysByUnityUseCase
	implements UseCase<FindAllHolidaysByUnityParams, IHoliday[]>
{
	constructor(
		private readonly holidaysRepository: HolidaysManagerContract,
		private readonly SaveHolidayNationalsUseCase: UseCase<number, IHoliday[]>,
	) { }

	public async execute({
		unity_id,
		year = new Date().getFullYear(),
	}: FindAllHolidaysByUnityParams): PromiseEither<AbstractError, IHoliday[]> {
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
