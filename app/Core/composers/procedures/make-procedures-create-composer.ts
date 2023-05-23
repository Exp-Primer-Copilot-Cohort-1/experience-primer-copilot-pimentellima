import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories/produceres'
import { CreateProceduresUseCase } from 'App/Core/domain/use-cases/procedures/create-procedures-use-case/create-procedures-use-case'

export const makeProceduresCreateComposer = (): ControllerGeneric => {
    return new Controller(new CreateProceduresUseCase(new ProceduresMongooseRepository()))
}
