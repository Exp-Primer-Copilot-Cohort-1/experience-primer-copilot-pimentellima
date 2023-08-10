import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Directmail from 'App/Models/Directmail'
import { IDirectmail } from 'Types/IDirectmail'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { DirectmailManagerInterface } from '../interface'

export class DirectmailsMongooseRepository implements DirectmailManagerInterface {
	constructor() { }

	async updateDirectMailActive(
		id: string,
		active: boolean,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmails = await Directmail.findByIdAndUpdate(
			id,
			{
				$set: { active },
			},
			{ new: true },
		)
		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		return right(directmails)
	}

	async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IDirectmail[]> {
		const directmails = await Directmail.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: true,
			unity_id,
		})

		if (!directmails) {
			return left(new UnitNotFoundError())
		}
		return right(directmails)
	}
	async findByNameInatives(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IDirectmail[]> {
		const directmails = await Directmail.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: false,
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
		const directmails = await Directmail.findByIdAndUpdate(id, data, {
			new: true,
		})
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
