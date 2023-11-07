import { ControllerInjection } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { CreatePrescriptionUseCase, FindPrescriptionsByIdUseCase, UpdatePrescriptionsByIdUseCase, UpdateStatusPrescriptionsByIdUseCase } from "App/Core/domain/use-cases";

export const makePrescriptionsFindByIdComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(FindPrescriptionsByIdUseCase)
};

export const makePrescriptionsCreateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(CreatePrescriptionUseCase)
};

export const makePrescriptionsUpdateStatusComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(UpdateStatusPrescriptionsByIdUseCase)
};

export const makePrescriptionsUpdateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(UpdatePrescriptionsByIdUseCase)
};