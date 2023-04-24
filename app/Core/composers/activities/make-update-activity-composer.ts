import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ActivityMongoRepository } from 'App/Core/domain/repositories/activities/activity-mongo-repository';
import { UpdateActivityUseCase } from 'App/Core/domain/use-cases/activities/update-activity-use-case';

export const makeUpdateActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityUseCase(new ActivityMongoRepository()),
	);
};
