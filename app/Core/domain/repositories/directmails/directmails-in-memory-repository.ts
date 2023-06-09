import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IDirectmail } from 'Types/IDirectmail'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { DirectmailManagerInterface } from '../interface'

export class DirectmailsInMemoryRepository implements DirectmailManagerInterface {
	public items: IDirectmail[] = []

	constructor() { }
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IDirectmail[]> {
		const directmails = this.items.filter(
			(item) => item.name === name && item.unity_id.toString() === unity_id,
		)

		if (directmails.length === 0) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
	public async findById(id: string): PromiseEither<AbstractError, IDirectmail[]> {
		const directmails = this.items.find((item) => item._id.toString() === id)

		if (!directmails) {
			return left(new UnitNotFoundError())
		}

		return right(this.items)
	}
	public async deleteDirectmailsById(
		id: string,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = this.items.find((item) => item._id.toString() === id)

		if (!directmails) {
			return left(new UnitNotFoundError())
		}

		return right(directmails)
	}
	public async updateDirectmailsById(
		id: string,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = this.items.find((item) => item._id.toString() === id)

		if (!directmails) {
			return left(new UnitNotFoundError())
		}

		return right(directmails)
	}
}
