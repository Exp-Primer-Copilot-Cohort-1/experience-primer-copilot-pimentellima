import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { MissingParamsError } from '../../errors/missing-params';
import { HealthInsuranceManagerInterface } from '../interface/health-insurance-manager.interface';

export class HealthInsuranceInMemoryManager
	implements HealthInsuranceManagerInterface {
	public async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, any[]> {
		if (!unity_id) {
			return left(new MissingParamsError('unity_id'));
		}
		return right([]);
	}

	public async findAllByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, any[]> {
		if (!name || !unity_id) {
			return left(
				new MissingParamsError()
					.addParam('name', name)
					.addParam('unity_id', unity_id),
			);
		}

		return right([]);
	}
}
