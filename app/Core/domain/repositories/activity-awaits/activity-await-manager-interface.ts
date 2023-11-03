import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivity, IActivityAwait } from 'App/Types/IActivity'

export interface ActivityAwaitManagerContract {
	create: (
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
	findAll: () => PromiseEither<AbstractError, IActivityAwait[]>
	updateById: (
		id: string,
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
	marked: (
		id: string,
		activity: IActivity
	) => PromiseEither<AbstractError, IActivity>
}
