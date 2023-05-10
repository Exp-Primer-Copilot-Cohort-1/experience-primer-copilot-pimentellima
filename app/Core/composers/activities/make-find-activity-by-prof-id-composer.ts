import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { FindActivitiesByProfIdUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-prof-use-case';

export const makeFindActivitiesByProfIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByProfIdUseCase(new ActivityMongoRepository()),
	);
};
