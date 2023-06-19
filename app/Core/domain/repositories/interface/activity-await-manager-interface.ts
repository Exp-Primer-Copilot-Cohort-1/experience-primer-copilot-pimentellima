import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared/either";
import { IActivityAwait } from "Types/IActivityAwait";

export interface ActivityAwaitManagerInterface {
	createActivity: (
		activity: IActivityAwait
	) => PromiseEither<AbstractError, IActivityAwait>;
	findAllActivities: (
		unity_id: string
	) => PromiseEither<AbstractError, IActivityAwait[]>;
	updateActivityById: (
		id: string,
		activity: IActivityAwait
	) => PromiseEither<AbstractError, IActivityAwait>;
	findActivityById: (id: string) => PromiseEither<AbstractError, IActivityAwait>;
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivityAwait>;
}
