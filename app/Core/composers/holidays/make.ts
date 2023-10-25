import { Controller, ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
} from 'App/Core/domain/repositories'
import {
	AddHolidaysByUnityUseCase,
	FindAllHolidaysByUnityUseCase,
	RemoveHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from 'App/Core/domain/use-cases'

export const makeHolidaysFindAllByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllHolidaysByUnityUseCase(
			new HolidaysMongoRepository(),
			new SaveHolidaysNationalsDefaultUseCase(
				new HolidaysNationalsMongoRepository(),
			),
		),
	)
}
export const makeHolidaysAddByUnityComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(AddHolidaysByUnityUseCase)

export const makeHolidaysRemoveByUnityComposer = (): ControllerGeneric =>
	ControllerInjection.resolve(RemoveHolidaysByUnityUseCase)


