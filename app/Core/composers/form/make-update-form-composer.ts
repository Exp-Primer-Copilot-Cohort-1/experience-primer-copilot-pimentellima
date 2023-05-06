import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { UpdateFormUseCase } from 'App/Core/domain/use-cases/form/update-form-use-case';

export const makeUpdateFormComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateFormUseCase(new FormMongoRepository()),
	);
};
