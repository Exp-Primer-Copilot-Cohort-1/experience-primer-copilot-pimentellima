import { Controller } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { ScheduleMongoRepository } from "App/Core/domain/repositories/schedule/schedule-mongo-repository";
import { VerifyScheduleUseCase } from "App/Core/domain/use-cases/schedule/verify-schedule-use-case";

export const makeVerifyScheduleComposer = (): ControllerGeneric => {
	return new Controller(
		new VerifyScheduleUseCase(new ScheduleMongoRepository())
	);
};
