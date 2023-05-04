import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories/produceres';
import { FindAllProceduresByUnityUseCase } from 'App/Core/domain/use-cases/procedures/find-all-procedures-by-unity';

export const makeProceduresFindAllComposer = (): ControllerGeneric => {
    return new Controller(
        new FindAllProceduresByUnityUseCase(new ProceduresMongooseRepository()),
    );
};
