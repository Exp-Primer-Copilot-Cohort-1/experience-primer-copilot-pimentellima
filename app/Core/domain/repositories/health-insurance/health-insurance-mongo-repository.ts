import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import HealthInsurance from 'App/Models/HealthInsurance';
import { OptsQuery } from '../../entities/helpers/opts-query';
import { MissingParamsError } from '../../errors/missing-params';
import { HealthInsuranceManagerInterface } from '../interface/health-insurance-manager.interface';

export class HealthInsuranceMongoRepository
	implements HealthInsuranceManagerInterface {
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }
	async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, any[]> {
		if (!unity_id) {
			return left(new MissingParamsError('unity_id'));
		}

		const healthInsurances = await HealthInsurance.find({
			unity_id,
		})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec();

		return right(healthInsurances);
	}

	async findAllByName(
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

		const healthInsurances = await HealthInsurance.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id,
		})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec();

		return right(healthInsurances);
	}
}
