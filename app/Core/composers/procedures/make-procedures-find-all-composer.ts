import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FindAllProceduresByUnityUseCase } from 'App/Core/domain/use-cases/procedures/find-all-procedures-by-unity';

export const makeProceduresFindAllComposer = (): ControllerGeneric => {
    return new Controller(new FindAllProceduresByUnityUseCase());
};
