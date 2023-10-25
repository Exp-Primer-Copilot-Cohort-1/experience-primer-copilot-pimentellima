import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { HolidaysMongoRepository } from 'App/Core/domain/repositories'
import { HolidaysManagerContract } from 'App/Core/domain/repositories/interface/holidays.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { inject, injectable, registry } from 'tsyringe'

type DeleteHoliday = {
	unity_id: string
	_id: string
}

@injectable()
@registry([{ token: RemoveHolidaysByUnityUseCase, useClass: RemoveHolidaysByUnityUseCase }])
export class RemoveHolidaysByUnityUseCase implements UseCase<DeleteHoliday, IHoliday[]> {

	constructor(
		@inject(HolidaysMongoRepository) private readonly manager: HolidaysManagerContract
	) { }

	public async execute({
		unity_id,
		_id,
	}: DeleteHoliday): PromiseEither<AbstractError, IHoliday[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		if (!_id) return left(new InvalidParamsError())

		return await this.manager.deleteHoliday(
			unity_id,
			_id,
		)
	}
}
