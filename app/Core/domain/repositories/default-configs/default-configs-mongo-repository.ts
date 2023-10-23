import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import DefaultConfig, { COLLECTION_REFS } from 'App/Models/DefaultConfig'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { inject, injectable, registry } from 'tsyringe'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { DefaultConfigsManagerContract } from '../interface'
@injectable()
@registry([{ token: DefaultConfigsMongooseRepository, useClass: DefaultConfigsMongooseRepository }])
export class DefaultConfigsMongooseRepository implements DefaultConfigsManagerContract {
	constructor(
		@inject(OptsQuery) private readonly optsQuery: OptsQuery
	) { }

	async updateOrCreate(
		data,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const doc = await DefaultConfig.findByIdAndUpdate(
			this.optsQuery.unity_id,
			{
				$set: {
					configs: data,
				},
			},
		).orFail()

		return right(doc.configs)
	}

	async find(): PromiseEither<AbstractError, IDefaultConfig> {
		const doc = await DefaultConfig
			.findById(this.optsQuery.unity_id)
			.populate(COLLECTION_REFS.BANK, PROJECTION_DEFAULT)
			.populate(COLLECTION_REFS.COST_CENTER, PROJECTION_DEFAULT)
			.orFail(new UnityNotFoundError())

		return right(doc.configs)
	}

}
