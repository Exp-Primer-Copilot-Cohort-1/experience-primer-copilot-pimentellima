import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	AdminMongooseRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories'
import {
	CreateUnityUseCase,
	CreateUserAdminUseCase,
	CreateUserUseCase,
} from 'App/Core/domain/use-cases'

import { CreatePasswordUseCase } from 'App/Core/domain/use-cases'

export const makeCreateUserComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateUserUseCase(new AdminMongooseRepository(), new CreatePasswordUseCase()),
	)
}

export const makeCreateAdminComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateUserAdminUseCase(
			new CreateUserUseCase(
				new AdminMongooseRepository(),
				new CreatePasswordUseCase(),
			),
			new CreateUnityUseCase(new UnitiesMongooseRepository()),
		),
	)
}
