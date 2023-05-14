import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { FindFormByIdUseCase } from 'App/Core/domain/use-cases/form/find-form-by-id-use-case';

export const makeFindFormByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindFormByIdUseCase(new FormMongoRepository()),
	);
};
