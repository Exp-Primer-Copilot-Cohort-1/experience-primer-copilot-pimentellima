import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository';
import { DeleteFormByIdUseCase } from 'App/Core/domain/use-cases/form/delete-form-by-id-use-case';

export const makeDeleteFormByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteFormByIdUseCase(new FormMongoRepository()),
	);
};
