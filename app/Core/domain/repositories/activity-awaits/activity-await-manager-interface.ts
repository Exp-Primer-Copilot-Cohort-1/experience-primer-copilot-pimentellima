import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivityAwait } from 'App/Types/IActivity'

export interface ActivityAwaitManagerInterface {
	create: (
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
	findAll: () => PromiseEither<AbstractError, IActivityAwait[]>
	updateById: (
		id: string,
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
}
