import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { CreateStockUseCase, UpdateStockUseCase } from 'App/Core/domain/use-cases';


export const makeCreateStockComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateStockUseCase)
};

export const makeUpdateStockComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateStockUseCase)
};