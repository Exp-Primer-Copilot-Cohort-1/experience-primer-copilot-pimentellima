import { ClientSession } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Unity from 'App/Models/Unity'
import { IUnity } from 'App/Types/IUnity'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { UnitiesManagerInterface } from '../interface/unities-manager.interface'

export class UnitiesMongooseRepository implements UnitiesManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
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
	async findByName(name: string): PromiseEither<AbstractError, IUnity[]> {
		const unity = await Unity.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
		})
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		return right(unity)
	}
	async deleteById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id)
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		await unity.remove()
		return right(unity)
	}
	async updateUnitiesById(
		id: string,
		data: Partial<IUnity>,
	): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findByIdAndUpdate(id, data, { new: true })
		if (!unity) {
			return left(new UnitNotFoundError())
		}
		return right(unity)
	}

	async create(
		{
			_id, // eslint-disable-line
			...unity
		}: IUnity,
		session: ClientSession,
	): PromiseEither<AbstractError, IUnity> {
		const unityCreated = await Unity.create([unity], { session })

		if (unityCreated?.length === 0)
			return left(new AbstractError('Não foi possível criar a unidade', 500))

		return right(unityCreated[0])
	}
}
