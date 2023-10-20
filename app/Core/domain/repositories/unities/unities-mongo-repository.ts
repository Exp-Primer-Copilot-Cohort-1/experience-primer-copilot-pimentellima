import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction, SessionTransaction } from 'App/Core/infra/session-transaction'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Unity, { COLLECTIONS_REFS } from 'App/Models/Unity'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'
import { UnityCreatedError } from '../../errors/unity-not-created-error'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { UnitiesManagerInterface } from '../interface/unities-manager.interface'
@injectable()
@registry([{ token: UnitiesMongooseRepository, useClass: UnitiesMongooseRepository }])
export class UnitiesMongooseRepository implements UnitiesManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line

	async findAll(): PromiseEither<AbstractError, IUnity[]> {
		const unities = await Unity.find()

		return right(unities)
	}
	async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unities = await Unity.findById(id)
			.populate(COLLECTIONS_REFS.COORDINATOR, PROJECTION_DEFAULT)
			.orFail(new UnityNotFoundError())

		return right(unities)
	}
	async findOne(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id)
		if (!unity) return left(new UnityNotFoundError())
		return right(unity)
	}
	async findByName(name: string): PromiseEither<AbstractError, IUnity[]> {
		const unity = await Unity.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
		})
		if (!unity) return left(new UnityNotFoundError())

		return right(unity)
	}
	async deleteById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id)
		if (!unity) return left(new UnityNotFoundError())

		await unity.deleteOne()
		return right(unity)
	}

	async update(
		id: string,
		data: Partial<IUnity>,
	): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findByIdAndUpdate(id, data, { new: true })
		if (!unity) return left(new UnityNotFoundError())

		return right(unity)
	}

	async create({
		_id, // eslint-disable-line
		...unity
	}: IUnity): PromiseEither<AbstractError, IUnity> {
		const unityCreated = await Unity.create([unity], { ...this.session?.options })

		if (unityCreated?.length === 0) return left(new UnityCreatedError())

		return right(unityCreated[0])
	}
}
