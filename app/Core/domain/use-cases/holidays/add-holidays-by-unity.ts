import { EntityHoliday } from 'App/Core/domain/entities/holidays/holiday-entity'
import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { HolidaysMongoRepository } from 'App/Core/domain/repositories'
import { HolidaysManagerContract } from 'App/Core/domain/repositories/interface/holidays.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { format, parseISO } from 'date-fns'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	unity_id: string
} & IHoliday

@injectable()
@registry([{ token: AddHolidaysByUnityUseCase, useClass: AddHolidaysByUnityUseCase }])
export class AddHolidaysByUnityUseCase implements UseCase<In, IHoliday> {
	constructor(
		@inject(HolidaysMongoRepository) private readonly manager: HolidaysManagerContract
	) { }

	public async execute({
		unity_id,
		...holiday
	}: In): PromiseEither<AbstractError, IHoliday> {

		if (!unity_id) return left(new UnityNotFoundError())
		if (!holiday) return left(new InvalidParamsError())

		const date = format(parseISO(holiday.date), 'yyyy-MM-dd')

		const holidayOrErr = await EntityHoliday.build({
			...holiday,
			date,
		})

		if (holidayOrErr.isLeft()) return left(holidayOrErr.extract())

		return await this.manager.addHoliday(
			unity_id,
			holidayOrErr.extract().params(),
		)
	}
}
