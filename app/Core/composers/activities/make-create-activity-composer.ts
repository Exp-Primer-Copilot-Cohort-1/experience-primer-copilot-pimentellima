import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { CreateActivityUseCase } from 'App/Core/domain/use-cases/activities/create-activity-use-case';

export const makeCreateActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityUseCase(new ActivityMongoRepository()),
	);
};
