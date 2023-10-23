import { isValidObjectId } from '@ioc:Mongoose'
import { HealthInsuranceEntity } from 'App/Core/domain/entities/health-insurances/health-insurance'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HealthInsurance, { COLLECTIONS } from 'App/Models/HealthInsurance'
import { HealthInsuranceParams, IHealthInsurance } from 'App/Types/IHealthInsurance'
import { inject, injectable, registry } from 'tsyringe'
import { HealthInsuranceNotFoundError } from '../../errors/health-insurance-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { HealthInsuranceManagerContract } from '../interface/health-insurance-manager.interface'

@injectable()
@registry([{ token: HealthInsuranceMongoRepository, useClass: HealthInsuranceMongoRepository }])
export class HealthInsuranceMongoRepository implements HealthInsuranceManagerContract {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { }

	async findAll(): PromiseEither<AbstractError, IHealthInsurance[]> {

		const doc = await HealthInsurance.find({
			unity_id: this.opts.unity_id,
			active: this.opts.active,
		})
			.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.exec()


		return right(doc)
	}

	async search(
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
			.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec()

		return right(healthInsurances)
	}

	async findById(id: string): PromiseEither<AbstractError, IHealthInsurance> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const healthInsurance = await HealthInsurance.findById(id)
			.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)
			.orFail(new HealthInsuranceNotFoundError())

		return right(healthInsurance)
	}

	async update(
		id: string,
		entity: Partial<IHealthInsurance>,
	): PromiseEither<AbstractError, IHealthInsurance> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const doc = await HealthInsurance.findByIdAndUpdate(id, entity, {
			new: true,
		})
			.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)
			.orFail(new HealthInsuranceNotFoundError())

		return right(doc)
	}

	async create(
		unity_id: string,
		{
			_id, // eslint-disable-line @typescript-eslint/no-unused-vars
			...params
		}: HealthInsuranceParams,
	): PromiseEither<AbstractError, IHealthInsurance> {
		const hOrErr = await HealthInsuranceEntity.build(params)
		if (hOrErr.isLeft()) return hOrErr

		const h = hOrErr.extract()

		const doc = await HealthInsurance.create({
			...h,
			unity_id,
		})

		return right(doc.toObject())
	}
}
