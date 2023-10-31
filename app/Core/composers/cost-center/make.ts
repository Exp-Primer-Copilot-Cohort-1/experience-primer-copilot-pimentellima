import { ControllerInjection } from "App/Core/adapters/controller"
import { ControllerGeneric } from "App/Core/adapters/controller/helpers"
import { CreateCostCenterUseCase, FindCostCenterByIdUseCase } from "App/Core/domain/use-cases"
import { UpdateCostCenterByIdUseCase } from "App/Core/domain/use-cases/cost-center/update-cost-center-by-id-use-case"

export const makeCostCenterCreateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(CreateCostCenterUseCase)
}

export const makeCostCenterShowComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(FindCostCenterByIdUseCase)
}

export const makeCostCenterUpdateComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(UpdateCostCenterByIdUseCase)
}