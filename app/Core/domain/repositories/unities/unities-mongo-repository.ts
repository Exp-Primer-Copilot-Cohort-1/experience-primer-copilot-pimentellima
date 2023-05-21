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
	public async findByName(name: string): PromiseEither<AbstractError, IUnity[]> {
		const unity = await Unity.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
		})
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		return right(unity)
	}
	public async deleteById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id)
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		await unity.remove()
		return right(unity)
	}
	async updateUnitiesById(id: string, data: any): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findByIdAndUpdate(id, data)
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		return right(unity)
	}
}
