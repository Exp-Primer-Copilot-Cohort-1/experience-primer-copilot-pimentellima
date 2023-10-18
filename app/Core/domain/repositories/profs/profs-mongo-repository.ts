import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { UserNotFoundError } from 'App/Core/domain/errors/user-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Prof from 'App/Models/Prof'
import { IUser as IProf } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { ProfManagerInterface } from '../interface/prof-manage-interface'

@injectable()
@registry([{ token: ProfsMongooseRepository, useClass: ProfsMongooseRepository }])
export class ProfsMongooseRepository implements ProfManagerInterface {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	async findByID(id: string, unity_id: string): PromiseEither<AbstractError, IProf> {
		const prof = await Prof.findOne({
			_id: id,
			unity_id,
			type: ['prof', 'admin_prof', 'admin'],
		})
		if (!prof) return left(new UserNotFoundError())
		return right(prof)
	}

	async findAll(): PromiseEither<AbstractError, IProf[]> {

		const prof = await Prof.find({
			unity_id: this.opts.unity_id,
			type: ['prof'],
		})
			.where(this.opts.only_prof)
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.sort(this.opts.sort)
			.select('-payment_participations -password')
			.exec()

		return right(prof)
	}

	async getCount(): PromiseEither<AbstractError, ICount> {
		const count = await Prof.countDocuments({
			unity_id: this.opts.unity_id,
			type: ['prof'],
		})
			.where(this.opts.only_prof)
			.exec()

		return right({ count })
	}
}
