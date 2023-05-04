import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { FindActivitiesByClientUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-client-use-case';

export const makeFindActivityByClientComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByClientUseCase(new ActivityMongoRepository()),
	);
};
