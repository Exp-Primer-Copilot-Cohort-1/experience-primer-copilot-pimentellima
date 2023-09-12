import { isValidObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import HealthInsurance, { COLLECTIONS } from 'App/Models/HealthInsurance'
import { HealthInsuranceParams, IHealthInsurance } from 'Types/IHealthInsurance'
import { HealthInsuranceEntity } from '../../entities/health-insurances/health-insurance'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { HealthInsuranceNotFoundError } from '../../errors/health-insurance-not-found'
import { MissingParamsError } from '../../errors/missing-params'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { HealthInsuranceManagerInterface } from '../interface/health-insurance-manager.interface'

export class HealthInsuranceMongoRepository implements HealthInsuranceManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }
	async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, IHealthInsurance[]> {
		if (!unity_id) return left(new UnitNotFoundError())

		const doc = await HealthInsurance.find({
			unity_id,
			active: this.opts.active,
		})
			.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.exec()

		return right(doc)
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

		const healthInsurance = await HealthInsurance.findById(id).populate(
			COLLECTIONS.PROFS,
			PROJECTION_DEFAULT,
		)

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
		}).populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		return right(healthInsurance)
	}

	async create(
		unity_id: string,
		{
			_id, // eslint-disable-line @typescript-eslint/no-unused-vars
			...params
		}: HealthInsuranceParams,
	): PromiseEither<AbstractError, IHealthInsurance> {
		const healthInsuranceOrErr = await HealthInsuranceEntity.build(params)
		if (healthInsuranceOrErr.isLeft()) return healthInsuranceOrErr

		const healthInsurance = healthInsuranceOrErr
			.extract()
			.params() as IHealthInsurance

		const created = await HealthInsurance.create({
			...healthInsurance,
			unity_id,
		})

		const doc = await created.populate(COLLECTIONS.PROFS, PROJECTION_DEFAULT)

		return right(doc)
	}
}
