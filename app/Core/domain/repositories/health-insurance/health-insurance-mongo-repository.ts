import { isValidObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HealthInsurance from 'App/Models/HealthInsurance'
import { IHealthInsurance } from 'Types/IHealthInsurance'
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
		entity: Partial<HealthInsuranceEntity>,
	): PromiseEither<AbstractError, HealthInsuranceEntity> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const healthInsurance = await HealthInsurance.findByIdAndUpdate(id, entity)

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		const entityOrErr = await HealthInsuranceEntity.build({
			...healthInsurance.toJSON(),
			...entity,
		} as IHealthInsurance)

		if (entityOrErr.isLeft()) return entityOrErr as any

		const updateEntity = entityOrErr.extract()

		return right(updateEntity)
	}

	async delete(id: string): PromiseEither<AbstractError, HealthInsuranceEntity> {
		return right({})
	}

	async create(
		entity: HealthInsuranceEntity,
	): PromiseEither<AbstractError, HealthInsuranceEntity> {
		const healthInsurances = await HealthInsurance.create(entity.params())

		entity.defineId(healthInsurances._id)

		return right(entity)
	}
}
