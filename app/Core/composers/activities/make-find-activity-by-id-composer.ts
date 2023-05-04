import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { FindActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/find-activity-by-id-use-case';

export const makeFindActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivityByIdUseCase(new ActivityMongoRepository()),
	);
};
