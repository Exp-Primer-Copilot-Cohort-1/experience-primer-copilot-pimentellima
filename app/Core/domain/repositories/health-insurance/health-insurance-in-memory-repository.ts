import { HealtInsuranceEntity } from 'App/Core/domain/entities/health-insurances/health-insurance'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance } from 'App/Types/IHealthInsurance'
import { MissingParamsError } from '../../errors/missing-params'
import { HealthInsuranceManagerContract } from '../interface/health-insurance-manager.interface'

export class HealthInsuranceInMemoryManager implements HealthInsuranceManagerContract {
	findAll: () => PromiseEither<AbstractError, IHealthInsurance[]>
	search: (name: string, unity_id: string) => PromiseEither<AbstractError, IHealthInsurance[]>
	private _items: HealtInsuranceEntity[] = []

	async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, IHealthInsurance[]> {
		if (!unity_id) {
			return left(new MissingParamsError('unity_id'))
		}
		return right([])
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

		return right([])
	}

	async findById(id: string): PromiseEither<AbstractError, HealtInsuranceEntity> {
		if (!id) {
			return left(new MissingParamsError('id'))
		}

		return right({} as HealtInsuranceEntity)
	}

	async update(id: string): PromiseEither<AbstractError, HealtInsuranceEntity> {
		if (!id) {
			return left(new MissingParamsError('id'))
		}

		return right({} as HealtInsuranceEntity)
	}

	async delete(id: string): PromiseEither<AbstractError, HealtInsuranceEntity> {
		if (!id) {
			return left(new MissingParamsError('id'))
		}

		return right({} as HealtInsuranceEntity)
	}

	async create(item): PromiseEither<AbstractError, HealtInsuranceEntity> {
		if (!item) {
			return left(new MissingParamsError('item'))
		}

		this._items.push(item)

		item.defineId('HealtInsuranceEntity_id')
		return right(item)
	}
}
