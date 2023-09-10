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
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
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
			.populate('profs', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec()

		return right(healthInsurances as unknown as IHealthInsurance[])
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
			.populate('profs', {
				_id: 0,
				label: '$name',
				value: '$_id',
			})
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })

			.exec()

		return right(healthInsurances as unknown as IHealthInsurance[])
	}

	async findById(id: string): PromiseEither<AbstractError, IHealthInsurance> {
		if (!isValidObjectId(id)) {
			return left(new HealthInsuranceNotFoundError())
		}

		const healthInsurance = await HealthInsurance.findById(id).populate('profs', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		return right(healthInsurance as unknown as IHealthInsurance)
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
		}).populate('profs', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		if (!healthInsurance) {
			return left(new HealthInsuranceNotFoundError())
		}

		return right(healthInsurance as unknown as IHealthInsurance)
	}

	async create(
		unity_id: string,
		params: HealthInsuranceParams,
	): PromiseEither<AbstractError, IHealthInsurance> {
		const healthInsuranceOrErr = await HealthInsuranceEntity.build(params)
		if (healthInsuranceOrErr.isLeft()) return left(healthInsuranceOrErr.extract())

		const healthInsurance = healthInsuranceOrErr
			.extract()
			.params() as IHealthInsurance

		const doc = await HealthInsurance.create({
			...healthInsurance,
			unity_id,
			profs: healthInsurance.profs?.map?.((prof) => prof.value),
		})

		return right(doc as unknown as IHealthInsurance)
	}
}
