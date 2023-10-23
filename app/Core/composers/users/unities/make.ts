import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories';
import { FindAllUnityByNameUseCase, ShowUnityByIdUseCase, UpdateUnitiesByIdUseCase } from 'App/Core/domain/use-cases';

export const makeUnityFindAllByNameComposer = (): ControllerGeneric => {
    return new Controller(new FindAllUnityByNameUseCase(new UnitiesMongooseRepository()))
}

export const makeUnityUpdateByIdComposer = (): ControllerGeneric => {
    return new Controller(new UpdateUnitiesByIdUseCase(new UnitiesMongooseRepository()))
}

export const makeUnityShowByIdComposer = (): ControllerGeneric => {
    return new Controller(
        new ShowUnityByIdUseCase(new UnitiesMongooseRepository()),
    );
};
// export const makeUnityShowByIdComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(ShowUnityByIdUseCase)


// export const makeUnityUpdateByIdComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(UpdateUnitiesByIdUseCase)

// export const makeUnityFindAllByNameComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(FindAllUnityByNameUseCase)