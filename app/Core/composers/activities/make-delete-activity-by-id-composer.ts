import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { DeleteActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/delete-activity-by-id-use-case';

export const makeDeleteActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteActivityByIdUseCase(new ActivityMongoRepository()),
	);
};
