import { DefaultConfigsEntity } from 'App/Core/domain/entities'
import { DefaultConfigsMongooseRepository } from 'App/Core/domain/repositories'
import { DefaultConfigsManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: UpdateDefaultConfigsByIdUseCase, useClass: UpdateDefaultConfigsByIdUseCase }])
export class UpdateDefaultConfigsByIdUseCase
	implements UseCase<Partial<IDefaultConfig>, IDefaultConfig>
{
	constructor(
		@inject(DefaultConfigsMongooseRepository)
		private readonly manager: DefaultConfigsManagerContract
	) { } // eslint-disable-line

	public async execute(
		data: IDefaultConfig,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const defaultConfigsOrErr = await DefaultConfigsEntity.build(data)

		if (defaultConfigsOrErr.isLeft()) return defaultConfigsOrErr

		const configs = defaultConfigsOrErr.extract()

		return await this.manager.updateOrCreate(configs)
	}
}
