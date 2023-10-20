import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Partner from 'App/Models/Partner'
import { IPartner } from 'App/Types/IPartner'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { PartnerManagerInterface } from '../interface/partner-manage-interface'

export class PartnerMongooseRepository implements PartnerManagerInterface {
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }

	public async findAll(unity_id: string): PromiseEither<AbstractError, IPartner[]> {
		const partners = await Partner.find({ unity_id })
			.sort(this.opts.sort)
			.limit(this.opts.limit)
			.skip(this.opts.skip)
			.where({ active: this.opts.active })
			.exec()
		return right(partners || [])
	}

	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IPartner[]> {
		const partner = await Partner.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id,
		})

		if (!partner) {
			return left(new UnityNotFoundError())
		}
		return right(partner)
	}
	public async create({
		_id,
		...data
	}: Partial<IPartner>): PromiseEither<AbstractError, IPartner> {
		const partner = await Partner.create({
			...data,
			unity_id: data.unity_id?.toString(),
			active: true,
		})

		return right(partner)
	}
	public async deleteByID(id: string): PromiseEither<AbstractError, IPartner> {
		const partner = await Partner.findById(id)
		if (!partner) {
			return left(new UnityNotFoundError())
		}
		await partner.deleteOne()
		return right(partner)
	}
	public async update(
		id: string,
		data: Partial<IPartner>,
	): PromiseEither<AbstractError, IPartner> {
		const partners = await Partner.findByIdAndUpdate(id, data, { new: true })
		if (!partners) {
			return left(new AbstractError('Não foi Possível Atualizar o Parceiro', 401))
		}
		return right(partners.toObject())
	}
}
