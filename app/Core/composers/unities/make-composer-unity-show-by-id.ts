import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories';
import { ShowUnityByIdUseCase } from 'App/Core/domain/use-cases/unities/show-unity-by-id-use-case/show-unity-by-id-use-case';

export const makeUnityShowByIdComposer = (): ControllerGeneric => {
    return new Controller(
        new ShowUnityByIdUseCase(new UnitiesMongooseRepository()),
    );
};
