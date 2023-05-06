import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { CreateFormUseCase } from 'App/Core/domain/use-cases/form/create-form-use-case';

export const makeCreateFormComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateFormUseCase(new FormMongoRepository()),
	);
};
