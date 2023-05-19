import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories/produceres';
import { DeleteProceduresByIdUseCase } from 'App/Core/domain/use-cases/procedures';

export const makeProceduresDeleteByIdComposer = (): ControllerGeneric => {
    return new Controller(
        new DeleteProceduresByIdUseCase(new ProceduresMongooseRepository()),
    );
};
