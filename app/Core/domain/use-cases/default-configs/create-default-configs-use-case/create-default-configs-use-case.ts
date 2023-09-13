import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import LogDecorator from 'App/Core/decorators/log-decorator'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { DefaultConfigsManagerInterface } from '../../../repositories/interface'

export class CreateDefaultConfigsUseCase
	implements UseCase<Partial<IDefaultConfig>, IDefaultConfig>
{
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { }

	@LogDecorator('default_configs', 'post')
	public async execute(
		configs: Partial<IDefaultConfig>,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const configsOrErr = await this.configsManager.createDefaultConfigs(configs)

		return configsOrErr
	}
}
