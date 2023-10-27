import { ControllerInjection } from "App/Core/adapters/controller"
import { ControllerGeneric } from "App/Core/adapters/controller/helpers"
import { CreateCostCenterUseCase, FindCostCenterByIdUseCase } from "App/Core/domain/use-cases"

export const makeCostCenterCreateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(CreateCostCenterUseCase)
}

export const makeCostCenterShowComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(FindCostCenterByIdUseCase)
}