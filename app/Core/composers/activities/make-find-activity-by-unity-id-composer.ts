import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { FindAllActivitiesByUnityUseCase } from 'App/Core/domain/use-cases';

export const makeFindActivityByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllActivitiesByUnityUseCase(new ActivityMongoRepository()),
	);
};
