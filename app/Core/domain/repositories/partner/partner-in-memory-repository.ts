import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPartner } from 'App/Types/IPartner'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { PartnerManagerInterface } from '../interface'

export class PartnerInMemoryRepository implements PartnerManagerInterface {
	public items: IPartner[] = []

	constructor() { }

	createPartner: (data: Partial<IPartner>) => PromiseEither<AbstractError, IPartner>

	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IPartner[]> {
		const partners = this.items.filter(
			(item) => item.name === name && item.unity_id.toString() === unity_id,
		)

		if (partners.length === 0) {
			return left(new UnityNotFoundError())
		}

		return right(this.items)
	}

	public async deletePartnerById(id: string): PromiseEither<AbstractError, IPartner> {
		const partner = this.items.find((item) => item._id.toString() === id)

		if (!partner) {
			return left(new UnityNotFoundError())
		}

		return right(partner)
	}
	public async updatePartnerById(id: string): PromiseEither<AbstractError, IPartner> {
		const partner = this.items.find((item) => item._id.toString() === id)

		if (!partner) {
			return left(new UnityNotFoundError())
		}

		return right(partner)
	}
}
