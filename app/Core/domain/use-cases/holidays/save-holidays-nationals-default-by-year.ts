import { HolidaysNationalsManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { inject, injectable, registry } from 'tsyringe'
import { HolidaysNationalsMongoRepository } from '../../repositories'
import { fetchHolidays } from '../helpers/holidays'

@injectable()
@registry([{ token: SaveHolidaysNationalsDefaultUseCase, useClass: SaveHolidaysNationalsDefaultUseCase }])
export class SaveHolidaysNationalsDefaultUseCase implements UseCase<Year, IHoliday[]> {

	constructor(
		@inject(HolidaysNationalsMongoRepository) private readonly manager: HolidaysNationalsManagerContract,
	) { }

	public async execute(year: Year): PromiseEither<AbstractError, IHoliday[]> {
		if (!year) return left(new AbstractError('Year is required', 400))

		const holidaysOrErr = await this.manager.findAllHolidays(year)

		if (holidaysOrErr.isRight()) return right(holidaysOrErr.extract())

		const holidays = await fetchHolidays(year)

		return await this.manager.saveHolidays(year, holidays)
	}
}
