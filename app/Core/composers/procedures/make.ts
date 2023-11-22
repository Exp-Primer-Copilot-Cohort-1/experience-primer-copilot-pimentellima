import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { CreateProceduresUseCase, UpdateProceduresByIdUseCase } from 'App/Core/domain/use-cases/procedures';
import { FindAllProceduresByUnityUseCase } from 'App/Core/domain/use-cases/procedures/find-all-procedures-use-case';
import { IOptsQuery } from 'App/Types/IOptsQuery';


export const makeProceduresFindAllComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllProceduresByUnityUseCase, opts)
};

export const makeProceduresCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateProceduresUseCase)
};

export const makeProceduresUpdateByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateProceduresByIdUseCase)
};
