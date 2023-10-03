import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	ActivityAttendanceMongoRepository,
	PaymentProfMongoRepository,
	ProceduresMongooseRepository,
	TransactionsMongooseRepository,
} from 'App/Core/domain/repositories'
import {
	CreateOnlyOneTransactionUseCase,
	CreateTransactionUseCase,
	CreateWithProceduresTransactionUseCase,
	UpdateActivityPaymentUseCase,
} from 'App/Core/domain/use-cases'
import { SessionTransaction } from 'App/Core/infra/session-transaction'

export const makeCreateTransactionComposer = (): ControllerGeneric => {
	const session = new SessionTransaction()

	return new Controller(
		new CreateTransactionUseCase(
			new CreateOnlyOneTransactionUseCase(
				new TransactionsMongooseRepository(session),
			),
			new CreateWithProceduresTransactionUseCase(
				new TransactionsMongooseRepository(session),
				new ProceduresMongooseRepository(session),
				new PaymentProfMongoRepository(session),
			),
			new UpdateActivityPaymentUseCase(new ActivityAttendanceMongoRepository()),
			session,
		),
	)
}
