import { Model } from '@ioc:Mongoose'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { GenericManagerInterface } from './generics-manager.interface'

@injectable()
@registry([{ token: CRUDRepository, useClass: CRUDRepository }])
export class CRUDRepository<T> implements GenericManagerInterface<T> {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery,
		@inject('Model') private readonly model: Model<T>
	) { } // eslint-disable-line

	async getCount(): PromiseEither<AbstractError, ICount> {
		const count = await this.model.countDocuments({ unity_id: this.opts.unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

	async findAll(): PromiseEither<AbstractError, T[]> {

		const data = await this.model.find({
			unity_id: this.opts.unity_id,
			active: this.opts.active,
		})
			.sort(this.opts.sort)
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.exec()

		return right(data)
	}

	async findById(id: string): PromiseEither<AbstractError, T> {

		const data = await this.model.findById(id).orFail()

		return right(data)
	}
}
