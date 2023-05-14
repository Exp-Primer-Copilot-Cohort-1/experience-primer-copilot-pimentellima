import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { FindFormByProfIdUseCase } from 'App/Core/domain/use-cases/form/find-form-by-prof-id-use-case';

export const makeFindFormByProfIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindFormByProfIdUseCase(new FormMongoRepository()),
	);
};
