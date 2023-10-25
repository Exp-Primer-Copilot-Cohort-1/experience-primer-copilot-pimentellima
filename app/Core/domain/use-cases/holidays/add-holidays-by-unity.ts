import { EntityHoliday } from 'App/Core/domain/entities/holidays/holiday-entity'
import { HolidaysManagerInterface } from 'App/Core/domain/repositories/interface/holidays.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { format, parseISO } from 'date-fns'
import { inject, injectable, registry } from 'tsyringe'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { HolidaysMongoRepository } from '../../repositories'

type NewHoliday = {
	unity_id: string
} & IHoliday

@injectable()
@registry([{ token: AddHolidaysByUnityUseCase, useClass: AddHolidaysByUnityUseCase }])
export class AddHolidaysByUnityUseCase implements UseCase<NewHoliday, IHoliday> {
	constructor(@inject(HolidaysMongoRepository) private readonly manager: HolidaysManagerInterface) { }

	public async execute({
		unity_id,
		...holiday
	}: NewHoliday): PromiseEither<AbstractError, IHoliday> {
		if (!unity_id) {
			return left(new UnityNotFoundError())
		}

		if (!holiday) {
			return left(new InvalidParamsError())
		}

		const date = format(parseISO(holiday.date), 'yyyy-MM-dd')

		const holidayOrErr = await EntityHoliday.build({
			...holiday,
			date,
		})

		if (holidayOrErr.isLeft()) {
			return left(holidayOrErr.extract())
		}

		const newHolidayOrErr = await this.manager.addHoliday(
			unity_id,
			holidayOrErr.extract().params(),
		)

		if (newHolidayOrErr.isLeft()) {
			return left(newHolidayOrErr.extract())
		}

		return right(newHolidayOrErr.extract())
	}
}
