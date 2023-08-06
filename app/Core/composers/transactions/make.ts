import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	PaymentProfMongoRepository,
	ProceduresMongooseRepository,
	TransactionsMongooseRepository,
} from 'App/Core/domain/repositories'
import {
	CreateOnlyOneTransactionUseCase,
	CreateTransactionUseCase,
	CreateWithProceduresTransactionUseCase,
} from 'App/Core/domain/use-cases'

export const makeCreateTransactionComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateTransactionUseCase(
			new CreateOnlyOneTransactionUseCase(new TransactionsMongooseRepository()),
			new CreateWithProceduresTransactionUseCase(
				new TransactionsMongooseRepository(),
				new ProceduresMongooseRepository(),
				new PaymentProfMongoRepository(),
			),
		),
	)
}
