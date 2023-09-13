import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IActivityAwait } from 'App/Types/IActivity'

export interface ActivityAwaitManagerInterface {
	createActivity: (
		unity_id: string,
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
	findAllActivities: (
		unity_id: string,
		...args: any[]
	) => PromiseEither<AbstractError, IActivityAwait[]>
	updateActivityById: (
		id: string,
		activity: IActivityAwait,
	) => PromiseEither<AbstractError, IActivityAwait>
	findActivityById: (id: string) => PromiseEither<AbstractError, IActivityAwait>
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivityAwait>
}
