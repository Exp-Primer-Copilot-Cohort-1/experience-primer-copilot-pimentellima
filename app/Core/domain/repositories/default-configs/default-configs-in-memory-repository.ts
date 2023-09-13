import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { DefaultConfigsManagerInterface } from '../interface'

export class DefaultConfigsInMemoryRepository implements DefaultConfigsManagerInterface {
	public items: IDefaultConfig[] = []

	constructor() { }
	public async findByUnity(
		unity_id: string,
	): PromiseEither<AbstractError, IDefaultConfig[]> {
		const configs = this.items.find((item) => item.unity_id.toString() === unity_id)

		if (!configs) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
	public async findById(id: string): PromiseEither<AbstractError, IDefaultConfig[]> {
		const configs = this.items.find((item) => item._id.toString() === id)

		if (!configs) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
	public async deleteDefaultConfigsById(
		id: string,
	): PromiseEither<AbstractError, IDefaultConfig[]> {
		const configs = this.items.find((item) => item._id.toString() === id)

		if (!configs) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
	public async updateDefaultConfigsById(
		id: string,
	): PromiseEither<AbstractError, IDefaultConfig[]> {
		const configs = this.items.find((item) => item._id.toString() === id)

		if (!configs) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
}
