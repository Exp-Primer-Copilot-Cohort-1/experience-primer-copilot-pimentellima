import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { UserNotFoundError } from 'App/Core/domain/errors/user-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Prof from 'App/Models/Prof'
import { IUser as IProf } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { ProfsManagerContract } from './profs-manage.interface'
import { ROLES } from 'App/Roles/types'

@injectable()
@registry([{ token: ProfsMongooseRepository, useClass: ProfsMongooseRepository }])
export class ProfsMongooseRepository implements ProfsManagerContract {
	constructor(@inject(OptsQuery) private readonly opts: OptsQuery) {} // eslint-disable-line

	async findById(id: string): PromiseEither<AbstractError, IProf> {
		const prof = await Prof.findOne({
			_id: id,
		})

		if (!prof) return left(new UserNotFoundError())

		return right(prof)
	}

	async findAll(): PromiseEither<AbstractError, IProf[]> {
		try {
			const profOfErr = await Prof.where({
				unity_id: this.opts.unity_id,
				active: this.opts.active,
				$or: [
					{ type: ROLES.ADMIN_PROF },
					{ type: ROLES.PROF },
				],
			})
				.skip(this.opts.skip)
				.limit(this.opts.limit)
				.sort(this.opts.sort)
				.select('-payment_participations -password')
				.exec()
			return right(profOfErr)
		} catch (e) {
			return left(new AbstractError('Erro', 500))
		}
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
