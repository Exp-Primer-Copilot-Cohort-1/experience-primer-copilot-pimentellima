import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { OptsSortQuery } from 'App/Core/domain/entities/helpers/opts-query';
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories/health-insurance/health-insurance-mongo-repository';
import { FindAllHealthInsuranceByUnityUseCase } from 'App/Core/domain/use-cases';

export const makeHealthInsuranceFindAllByUnityIdComposer = (
	opts: OptsSortQuery,
): ControllerGeneric => {
	return new Controller(
		new FindAllHealthInsuranceByUnityUseCase(
			new HealthInsuranceMongoRepository(opts),
		),
	);
};
