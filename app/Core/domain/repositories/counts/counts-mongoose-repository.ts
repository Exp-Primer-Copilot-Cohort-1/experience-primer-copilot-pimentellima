import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import { inject, injectable, registry } from 'tsyringe'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { ICount } from '../helpers/count'
import { CountsManagerInterface } from './counts-manager.interface'

@injectable()
@registry([{ token: CountsMongooseRepository, useClass: CountsMongooseRepository }])
export class CountsMongooseRepository implements CountsManagerInterface {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery,
		@inject('Model') private readonly model
	) { } // eslint-disable-line

	async getCount(unity_id: string): PromiseEither<AbstractError, ICount> {
		const count = await this.model.countDocuments({ unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

}
