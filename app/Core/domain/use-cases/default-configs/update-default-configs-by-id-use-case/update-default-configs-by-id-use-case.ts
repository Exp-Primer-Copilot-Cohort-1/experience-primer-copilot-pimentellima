import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { DefaultConfigsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'

export class UpdateDefaultConfigsByIdUseCase
	implements UseCase<Partial<IDefaultConfig>, IDefaultConfig>
{
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { } // eslint-disable-line

	public async execute(
		configsOrErr: Partial<IDefaultConfig>,
	): PromiseEither<AbstractError, IDefaultConfig> {
		if (!configsOrErr?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const configsOrErrOrErr = await this.configsManager.updateDefaultConfigsById(
			configsOrErr._id,
			configsOrErr,
		)

		if (configsOrErrOrErr.isLeft()) {
			return left(configsOrErrOrErr.extract())
		}

		return configsOrErrOrErr
	}
}
