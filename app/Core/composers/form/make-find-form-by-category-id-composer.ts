import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { FindFormByCategoryIdUseCase } from 'App/Core/domain/use-cases/form/find-form-by-category-id-use-case';

export const makeFindFormByCategoryIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindFormByCategoryIdUseCase(new FormMongoRepository()),
	);
};
