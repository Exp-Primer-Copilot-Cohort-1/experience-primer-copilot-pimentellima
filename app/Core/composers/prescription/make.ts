import { ControllerInjection } from "App/Core/adapters/controller";
import { ControllerGeneric } from "App/Core/adapters/controller/helpers";
import { CreatePrescriptionUseCase, FindAllPrescrioptionsUseCase, FindPrescriptionsByIdUseCase, UpdatePrescriptionsByIdUseCase, UpdateStatusPrescriptionsByIdUseCase } from "App/Core/domain/use-cases";
import { IOptsQuery } from "App/Types/IOptsQuery";

export const makeFindAllPrescriptionsComposer = (opts: IOptsQuery): ControllerGeneric =>
    ControllerInjection.resolve(FindAllPrescrioptionsUseCase, opts)

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