import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IProcedure } from 'App/Types/IProcedure'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { ProceduresManagerInterface } from '../interface'

export class ProceduresInMemoryRepository implements ProceduresManagerInterface {
	private items: IProcedure[] = [
		{ name: 'name', unity_id: 'unity_id', _id: 'idtest' },
		{ name: 'name2', unity_id: 'unity_id', _id: 'idtest2' },
		{ name: 'name3', unity_id: 'unity_id', _id: 'idtest3' },
	]

	constructor() { }
	createProcedure(data: any): PromiseEither<AbstractError, IProcedure> {
		throw new Error('Method not implemented.')
	}
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		return right(this.items)
	}

	public async findById(unity_id: string): PromiseEither<AbstractError, IProcedure[]> {
		const procedure = this.items.find((item) => item.unity_id.toString() === unity_id)

		if (!procedure) {
			return left(new UnityNotFoundError())
		}

		return right(this.items)
	}
	public async deleteById(id: string): PromiseEither<AbstractError, IProcedure> {
		const procedure = this.items.find((item) => item._id === id)

		if (!procedure) {
			return left(new UnityNotFoundError())
		}

		return right(procedure)
	}
	public async updateProceduresById(
		id: string,
	): PromiseEither<AbstractError, IProcedure> {
		const procedures = this.items.find((item) => item._id === id)

		if (!procedures) {
			return left(new UnityNotFoundError())
		}

		return right(procedures)
	}
}
