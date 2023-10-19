import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import Sec from 'App/Models/Sec'
import { IUser as ISecs } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { SecsManagerInterface } from './secs-manage.interface'

@injectable()
@registry([{ token: SecsMongooseRepository, useClass: SecsMongooseRepository }])
export class SecsMongooseRepository implements SecsManagerInterface {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	async findAll(): PromiseEither<AbstractError, ISecs[]> {

		const secs = await Sec.find({
			unity_id: this.opts.unity_id,
			type: ['sec'],
		})
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.sort(this.opts.sort)
			.select('-payment_participations -password')
			.exec()

		return right(secs)
	}

	async getCount(): PromiseEither<AbstractError, ICount> {
		const count = await Sec.countDocuments({
			unity_id: this.opts.unity_id,
			type: ['prof'],
		})
			.exec()

		return right({ count })
	}
}
