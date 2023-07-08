import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Prof from 'App/Models/Prof'
import { IUser as IProf } from 'Types/IUser'
import { UserNotFoundError } from '../../errors/user-not-found'
import { ProfManagerInterface } from '../interface/prof-manage-interface'

export class ProfsMongooseRepository implements ProfManagerInterface {
	constructor() { }
	async findByID(id: string, unity_id: string): PromiseEither<AbstractError, IProf> {
		const prof = await Prof.findOne({
			_id: id,
			unity_id,
			type: ['prof', 'admin_prof'],
		})
		if (!prof) return left(new UserNotFoundError())
		return right(prof)
	}
	async findAll(unity_id: string): PromiseEither<AbstractError, IProf[]> {
		const prof = await Prof.find({
			unity_id,
			type: ['prof', 'admin_prof'],
		})
		return right(prof)
	}

	createProf: (data: Partial<IProf>) => PromiseEither<AbstractError, IProf>
	deleteProfById: (id: string) => PromiseEither<AbstractError, IProf>
	updateProfById: (
		id: string,
		data: Partial<IProf>,
	) => PromiseEither<AbstractError, IProf>
}
