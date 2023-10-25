import { HolidaysManagerInterface } from 'App/Core/domain/repositories/interface/holidays.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { inject, injectable, registry } from 'tsyringe'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { HolidaysMongoRepository } from '../../repositories'

type DeleteHoliday = {
	unity_id: string
	_id: string
}

@injectable()
@registry([{ token: RemoveHolidaysByUnityUseCase, useClass: RemoveHolidaysByUnityUseCase }])
export class RemoveHolidaysByUnityUseCase implements UseCase<DeleteHoliday, IHoliday[]> {
	constructor(@inject(HolidaysMongoRepository) private readonly manager: HolidaysManagerInterface) { }

	public async execute({
		unity_id,
		_id,
	}: DeleteHoliday): PromiseEither<AbstractError, IHoliday[]> {
		if (!unity_id) {
			return left(new UnityNotFoundError())
		}

		if (!_id) {
			return left(new InvalidParamsError())
		}

		const removeHolidayOrErr = await this.manager.deleteHoliday(
			unity_id,
			_id,
		)

		if (removeHolidayOrErr.isLeft()) {
			return left(removeHolidayOrErr.extract())
		}

		return right(removeHolidayOrErr.extract())
	}
}
