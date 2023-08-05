import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { TransactionsMongooseRepository } from 'App/Core/domain/repositories'
import { CreateTransactionUseCase } from 'App/Core/domain/use-cases'

export const makeCreateTransactionComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateTransactionUseCase(new TransactionsMongooseRepository()),
	)
}
