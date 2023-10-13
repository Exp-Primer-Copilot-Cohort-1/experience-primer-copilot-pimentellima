import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { CreateProceduresUseCase, UpdateProceduresByIdUseCase } from 'App/Core/domain/use-cases/procedures';
import { FindAllProceduresUseCase } from 'App/Core/domain/use-cases/procedures/find-all-procedures-use-case';


export const makeProceduresFindAllComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllProceduresUseCase)
};

export const makeProceduresCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateProceduresUseCase)
};

export const makeProceduresUpdateByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateProceduresByIdUseCase)
};
