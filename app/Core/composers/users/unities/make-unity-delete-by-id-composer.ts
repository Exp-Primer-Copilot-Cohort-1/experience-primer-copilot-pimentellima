import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories';
import { DeleteUnitiesByIdUseCase } from 'App/Core/domain/use-cases';

export const makeUnityDeleteByIdComposer = (): ControllerGeneric => {
    return new Controller(
        new DeleteUnitiesByIdUseCase(new UnitiesMongooseRepository()),
    );
};
