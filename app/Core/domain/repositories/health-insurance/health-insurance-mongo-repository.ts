import { isValidObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HealthInsurance from 'App/Models/HealthInsurance'
import { HealthInsuranceParams, IHealthInsurance } from 'Types/IHealthInsurance'
import { HealthInsuranceEntity } from '../../entities/health-insurances/health-insurance'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { HealthInsuranceNotFoundError } from '../../errors/health-insurance-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { HealthInsuranceManagerInterface } from '../interface/health-insurance-manager.interface'

export class HealthInsuranceMongoRepository implements HealthInsuranceManagerInterface {
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }
	async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, IHealthInsurance[]> {
		if (!unity_id) {
			return left(new MissingParamsError('unity_id'))
		}

		const healthInsurances = await HealthInsurance.find({
			unity_id,
		})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec()

		return right(healthInsurances)
	}

	async findAllByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IHealthInsurance[]> {
		if (!name || !unity_id) {
			return left(
				new MissingParamsError()
					.addParam('name', name)
					.addParam('unity_id', unity_id),
			)
		}

		const healthInsurances = await HealthInsurance.find({
			name: { $regex: new RegExp(`.*${name.toUpperCase()}.*`) },
			unity_id,
		})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec()

		return right(healthInsurances)
	}

	async findById(id: string): PromiseEither<AbstractError, HealthInsuranceEntity> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const healthInsurance = await HealthInsurance.findById(id)

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		return right(healthInsurance)
	}

	async update(
		id: string,
		entity: Partial<IHealthInsurance>,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const healthInsurance = await HealthInsurance.findByIdAndUpdate(id, entity, {
			new: true,
		})

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		return right(healthInsurance)
	}

	async delete(id: string): PromiseEither<AbstractError, HealthInsuranceEntity> {
		return right({} as any)
	}

	async create(
		unity_id: string,
		params: HealthInsuranceParams,
	): PromiseEither<AbstractError, IHealthInsurance> {
		const healthInsuranceOrErr = await HealthInsuranceEntity.build(params)
		if (healthInsuranceOrErr.isLeft()) return left(healthInsuranceOrErr.extract())
		const healthInsurance = await HealthInsurance.create(
			healthInsuranceOrErr.extract().defineUnityId(unity_id).params(),
		)

		return right(healthInsurance)
	}
}
