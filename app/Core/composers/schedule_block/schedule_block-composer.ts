import { Controller } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { ScheduleBlockMongoRepository } from "App/Core/domain/repositories/schedule-block/schedule-block-mongo-repository";
import { CreateScheduleBlockUseCase } from "App/Core/domain/use-cases/schedule_blocks/create-schedule-block-use-case";
import { DeleteScheduleBlockUseCase } from "App/Core/domain/use-cases/schedule_blocks/delete-schedule-block-use-case";
import { FindAllScheduleBlockUseCase } from "App/Core/domain/use-cases/schedule_blocks/find-all-schedule-block-use-case";

export const makeCreateScheduleBlockComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateScheduleBlockUseCase(new ScheduleBlockMongoRepository())
	);
};
export const makeDeleteScheduleBlockByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteScheduleBlockUseCase(new ScheduleBlockMongoRepository())
	);
};
export const makeFindAllScheduleBlocksComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllScheduleBlockUseCase(new ScheduleBlockMongoRepository())
	);
};
