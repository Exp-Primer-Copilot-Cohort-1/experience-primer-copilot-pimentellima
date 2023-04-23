import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';

export interface HealthInsuranceManagerInterface {
	findAllByUnityId: (unity_id: string) => PromiseEither<AbstractError, any[]>;
	findAllByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, any[]>;
}
