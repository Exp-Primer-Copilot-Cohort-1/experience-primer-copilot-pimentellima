import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { ProceduresMongooseRepository } from 'App/Core/domain/repositories/procedures'
import { UpdateProceduresByIdUseCase } from 'App/Core/domain/use-cases/procedures'

export const makeProceduresUpdateByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateProceduresByIdUseCase(new ProceduresMongooseRepository()),
	)
}
