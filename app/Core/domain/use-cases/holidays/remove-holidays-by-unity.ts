import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'App/Types/IHoliday'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { HolidaysManagerInterface } from '../../repositories/interface/holidays.interface'

type DeleteHoliday = {
	unity_id: string
	_id: string
}

export class RemoveHolidaysByUnityUseCase implements UseCase<DeleteHoliday, IHoliday[]> {
	constructor(private readonly holidaysRepository: HolidaysManagerInterface) { }

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

		const removeHolidayOrErr = await this.holidaysRepository.deleteHoliday(
			unity_id,
			_id,
		)

		if (removeHolidayOrErr.isLeft()) {
			return left(removeHolidayOrErr.extract())
		}

		return right(removeHolidayOrErr.extract())
	}
}
