import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	AdminMongooseRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories'
import { DrPerformanceMongoose } from 'App/Core/domain/repositories/dr_performance'
import {
	CreateFranchiseDrPerformanceUseCase,
	CreateUnityUseCase,
	CreateUserAdminUseCase,
	CreateUserUseCase,
} from 'App/Core/domain/use-cases'

import { CreatePasswordUseCase } from 'App/Core/domain/use-cases'
import { SessionTransaction } from 'App/Core/infra/session-transaction'

export const makeCreateUserComposer = (): ControllerGeneric => {
	const session = new SessionTransaction()

	return new Controller(
		new CreateUserUseCase(
			new AdminMongooseRepository(session),
			new CreatePasswordUseCase(),
		),
	)
}

export const makeCreateAdminComposer = (): ControllerGeneric => {
	const session = new SessionTransaction()

	return new Controller(
		new CreateUserAdminUseCase(
			new CreateUserUseCase(
				new AdminMongooseRepository(session),
				new CreatePasswordUseCase(),
			),
			new CreateUnityUseCase(new UnitiesMongooseRepository(session)),
			new CreateFranchiseDrPerformanceUseCase(new DrPerformanceMongoose(session)),
			session,
		),
	)
}
