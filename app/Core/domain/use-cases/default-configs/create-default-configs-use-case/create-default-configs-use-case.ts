import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { DefaultConfigsManagerInterface } from 'App/Core/domain/repositories/interface'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'

export class CreateDefaultConfigsUseCase
	implements UseCase<Partial<IDefaultConfig>, IDefaultConfig>
{
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { }

	public async execute(
		configs: Partial<IDefaultConfig>,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const configsOrErr = await this.configsManager.createDefaultConfigs(configs)

		return configsOrErr
	}
}
