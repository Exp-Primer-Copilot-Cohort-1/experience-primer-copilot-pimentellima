import { ControllerInjection } from "App/Core/adapters/controller"
import { ControllerGeneric } from "App/Core/adapters/controller/helpers"
import { ShowProfileUseCase, UpdateProfileUseCase } from "App/Core/domain/use-cases"

export const makeProfileShowComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(ShowProfileUseCase)
}

export const makeProfileUpdateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(UpdateProfileUseCase)
}