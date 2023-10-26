import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { SendPasswordRecoveryEmailUseCase } from 'App/Core/domain/use-cases'

export const makeSendRecoveryEmailComposer = (): ControllerGeneric => {
    return ControllerInjection.resolve(SendPasswordRecoveryEmailUseCase)

}
