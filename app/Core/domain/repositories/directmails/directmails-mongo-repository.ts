import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Directmail from 'App/Models/Directmail'
import { IDirectmail } from 'Types/IDirectmail'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { DirectmailManagerInterface } from '../interface'

export class DirectmailsMongooseRepository implements DirectmailManagerInterface {
	constructor() { }
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IDirectmail[]> {
		const directmails = await Directmail.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id,
		})

		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		return right(directmails)
	}
	async findById(id: string): PromiseEither<AbstractError, IDirectmail> {
		const directmails = await Directmail.findById(id)
		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		return right(directmails)
	}
	public async createDirectmails(
		data: Partial<IDirectmail>,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = await Directmail.create({
			...data,
			active: true,
		})

		return right(directmails)
	}
	public async updateDirectmailsById(
		id: string,
		data: Partial<IDirectmail>,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = await Directmail.findByIdAndUpdate(id, data)
		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		return right(directmails)
	}
	public async deleteDirectmailsById(
		id: string,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = await Directmail.findById(id)
		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		await directmails.remove()
		return right(directmails)
	}
}
