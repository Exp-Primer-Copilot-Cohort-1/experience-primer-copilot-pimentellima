import { Controller } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { ActivityAwaitMongoRepository } from "App/Core/domain/repositories/activity-awaits/activity-await-mongo-repository";
import { CreateActivityAwaitUseCase } from "App/Core/domain/use-cases/activity-awaits/create-activity-use-case";
import { DeleteActivityAwaitUseCase } from "App/Core/domain/use-cases/activity-awaits/delete-activity-use-case";
import { FindActivityAwaitByIdUseCase } from "App/Core/domain/use-cases/activity-awaits/find-activity-by-id-use-case";
import { FindAllActivityAwaitUseCase } from "App/Core/domain/use-cases/activity-awaits/find-all-activities-use-case";
import { UpdateActivityAwaitUseCase } from "App/Core/domain/use-cases/activity-awaits/update-activity-use-case";

export const makeCreateActivityAwaitComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityAwaitUseCase(new ActivityAwaitMongoRepository())
	);
};
export const makeDeleteActivityAwaitByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteActivityAwaitUseCase(new ActivityAwaitMongoRepository())
	);
};
export const makeFindActivityAwaitByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivityAwaitByIdUseCase(new ActivityAwaitMongoRepository())
	);
};
export const makeFindAllActivitiesAwaitComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllActivityAwaitUseCase(new ActivityAwaitMongoRepository())
	);
};
export const makeUpdateActivityAwaitByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityAwaitUseCase(new ActivityAwaitMongoRepository())
	);
};
