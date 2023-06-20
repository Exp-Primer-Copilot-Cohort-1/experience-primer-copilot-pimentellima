import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { DirectmailsMongooseRepository } from 'App/Core/domain/repositories'
import { UpdateDirectmailsByIdUseCase } from 'App/Core/domain/use-cases'

export const makeDirectmailsUpdateByIdComposer = (): ControllerGeneric => {
    return new Controller(
        new UpdateDirectmailsByIdUseCase(new DirectmailsMongooseRepository()),
    )
}
