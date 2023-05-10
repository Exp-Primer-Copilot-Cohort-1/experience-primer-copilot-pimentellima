import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { FindAllFormsUseCase } from 'App/Core/domain/use-cases/form/find-all-forms-use-case';

export const makeFindAllFormsComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllFormsUseCase(new FormMongoRepository()),
	);
};
