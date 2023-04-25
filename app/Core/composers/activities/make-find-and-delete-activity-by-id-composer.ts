import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { FindAndDeleteActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/find-and-delete-activity-by-id-use-case';

export const makeFindAndDeleteActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAndDeleteActivityByIdUseCase(new ActivityMongoRepository()),
	);
};
