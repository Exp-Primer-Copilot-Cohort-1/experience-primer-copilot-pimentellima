import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { CountsManagerInterface } from './counts-manager.interface'

@injectable()
@registry([{ token: CountsMongooseRepository, useClass: CountsMongooseRepository }])
export class CountsMongooseRepository implements CountsManagerInterface {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery,
		@inject('Model') private readonly model
	) { } // eslint-disable-line

	async getCount(): PromiseEither<AbstractError, ICount> {
		const count = await this.model.countDocuments({ unity_id: this.opts.unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

}
