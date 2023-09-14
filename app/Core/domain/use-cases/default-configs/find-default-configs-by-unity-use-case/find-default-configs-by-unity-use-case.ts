import { DefaultConfigsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { MissingParamsError } from '../../../errors/missing-params'
type FindAllProps = {
	unity_id: string
}

export class FindDefaultConfigByUnityUseCase
	implements UseCase<FindAllProps, IDefaultConfig[]>
{
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { }

	public async execute(
		input: FindAllProps,
	): PromiseEither<AbstractError, IDefaultConfig[]> {
		if (!input?.unity_id) {
			return left(new MissingParamsError('unity_id'))
		}

		const configsOrErr = await this.configsManager.findByUnity(input.unity_id)
		if (configsOrErr.isLeft()) {
			return left(configsOrErr.extract())
		}
		return configsOrErr
	}
}
