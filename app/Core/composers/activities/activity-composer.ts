import { Controller } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { ActivityMongoRepository } from "App/Core/domain/repositories/activities/activity-mongo-repository";
import { FindAllActivitiesUseCase } from "App/Core/domain/use-cases";
import { CreateActivityInAwaitUseCase } from "App/Core/domain/use-cases/activities/create-activity-in-await-use-case";
import { CreateActivityUseCase } from "App/Core/domain/use-cases/activities/create-activity-use-case";
import { DeleteActivityByIdUseCase } from "App/Core/domain/use-cases/activities/delete-activity-by-id-use-case";
import { FindActivitiesByClientIdUseCase } from "App/Core/domain/use-cases/activities/find-activities-by-client-use-case";
import { FindActivitiesByProfIdUseCase } from "App/Core/domain/use-cases/activities/find-activities-by-prof-use-case";
import { FindActivityByIdUseCase } from "App/Core/domain/use-cases/activities/find-activity-by-id-use-case";
import { UpdateActivityStatusByIdUseCase } from "App/Core/domain/use-cases/activities/update-activity-status-by-use-case";
import { UpdateActivityStartedAtUseCase } from "App/Core/domain/use-cases/activities/update-activity-started-at-use-case";
import { UpdateActivityByIdUseCase } from "App/Core/domain/use-cases/activities/update-activity-use-case";
import { UpdateActivityFinishedAtUseCase } from "App/Core/domain/use-cases/activities/update-activity-finished-at-use-case";

export const makeCreateActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityUseCase(new ActivityMongoRepository())
	);
};
export const makeCreateActivityInAwaitComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityInAwaitUseCase(new ActivityMongoRepository())
	);
};
export const makeDeleteActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteActivityByIdUseCase(new ActivityMongoRepository())
	);
};
export const makeFindActivityByClientIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByClientIdUseCase(new ActivityMongoRepository())
	);
};
export const makeFindActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivityByIdUseCase(new ActivityMongoRepository())
	);
};
export const makeFindActivitiesByProfIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByProfIdUseCase(new ActivityMongoRepository())
	);
};
export const makeFindAllActivitiesComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllActivitiesUseCase(new ActivityMongoRepository())
	);
};
export const makeUpdateActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityByIdUseCase(new ActivityMongoRepository())
	);
};

export const makeUpdateActivityStatusComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityStatusByIdUseCase(new ActivityMongoRepository()),
	);
};

export const makeUpdateActivityStartedAtComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityStartedAtUseCase(new ActivityMongoRepository()),
	);
};

export const makeUpdateActivityFinishedAtComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityFinishedAtUseCase(new ActivityMongoRepository()),
	);
};


