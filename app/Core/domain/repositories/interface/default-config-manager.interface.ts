import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'

export interface DefaultConfigsManagerInterface {
	findByUnity: (unity_id: string) => PromiseEither<AbstractError, IDefaultConfig[]>
	createDefaultConfigs: (
		data: Partial<IDefaultConfig>,
	) => PromiseEither<AbstractError, IDefaultConfig>
	findById: (id: string) => PromiseEither<AbstractError, IDefaultConfig>
	deleteDefaultConfigsById: (id: string) => PromiseEither<AbstractError, IDefaultConfig>
	updateDefaultConfigsById: (
		id: string,
		data: Partial<IDefaultConfig>,
	) => PromiseEither<AbstractError, IDefaultConfig>
}
