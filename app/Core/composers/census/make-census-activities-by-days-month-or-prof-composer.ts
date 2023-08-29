import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusDaysMongooseRepository } from 'App/Core/domain/repositories'
import { findActivitiesByDaysOfMonthUseCase } from 'App/Core/domain/use-cases'

export const makeCensusActivitiesByDaysMonthByUnityOrProfComposer =
	(): ControllerGeneric => {
		return new Controller(
			new findActivitiesByDaysOfMonthUseCase(new CensusDaysMongooseRepository()),
		)
	}
