import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	AdminMongooseRepository,
	UnitiesMongooseRepository,
} from 'App/Core/domain/repositories'
import { CreateUserUseCase } from 'App/Core/domain/use-cases'

import { CreatePasswordUseCase } from 'App/Core/domain/use-cases'

export const makeCreateAdminUserComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateUserUseCase(
			new UnitiesMongooseRepository(),
			new AdminMongooseRepository(),
			new CreatePasswordUseCase(),
		),
	)
}
