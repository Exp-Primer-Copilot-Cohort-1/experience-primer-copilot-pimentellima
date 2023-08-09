import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusDaysMongooseRepository } from 'App/Core/domain/repositories'
import { FindActivitiesByDaysOfMonthByUnityOrProfUseCase } from 'App/Core/domain/use-cases'

export const makeCensusActivitiesByDaysMonthByUnityOrProfComposer =
	(): ControllerGeneric => {
		return new Controller(
			new FindActivitiesByDaysOfMonthByUnityOrProfUseCase(
				new CensusDaysMongooseRepository(),
			),
		)
	}
