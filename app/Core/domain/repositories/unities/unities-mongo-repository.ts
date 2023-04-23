import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Unity from 'App/Models/Unity'
import { IUnity } from 'Types/IUnity'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { UnitiesManagerInterface } from '../interface/unities-manager.interface'

export class UnitiesMongooseRepository implements UnitiesManagerInterface {
	constructor() { }
	async findAll(): PromiseEither<AbstractError, IUnity[]> {
		const unities = await Unity.find()

		if (!unities) {
			return left(new UnitNotFoundError())
		}

		return right(unities)
	}
	async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unities = await Unity.findById(id)
		if (!unities) {
			return left(new UnitNotFoundError())
		}
		return right(unities)
	}

	async findOne(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id)
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		return right(unity)
	}
}
