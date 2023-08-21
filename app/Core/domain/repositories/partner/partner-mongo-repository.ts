import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Partner from 'App/Models/Partner'
import { IPartner } from 'Types/IPartner'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { UnitNotFoundError } from '../../errors/unit-not-found'
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
			return left(new UnitNotFoundError())
		}
		return right(partner)
	}
	public async createPartner({
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
	public async deletePartnerById(id: string): PromiseEither<AbstractError, IPartner> {
		const partner = await Partner.findById(id)
		if (!partner) {
			return left(new UnitNotFoundError())
		}
		await partner.remove()
		return right(partner)
	}
	public async updatePartnerById(
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
