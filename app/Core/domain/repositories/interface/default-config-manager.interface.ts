import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'

export interface DefaultConfigsManagerContract {
	updateOrCreate: (
		data: Partial<IDefaultConfig>,
	) => PromiseEither<AbstractError, IDefaultConfig>
	find: () => PromiseEither<AbstractError, IDefaultConfig>
}
