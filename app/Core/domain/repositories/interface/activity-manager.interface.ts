import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared/either";
import {
	ActivityParams,
	IActivity,
	PaymentValues,
	RecurrentActivityParams,
} from "Types/IActivity";
import { AppointmentStatus } from "App/Helpers";

export interface ActivitiesManagerInterface {
	createActivity: (
		unity_id: string,
		values: ActivityParams
	) => PromiseEither<AbstractError, IActivity>;
	createRecurrentActivity: (
		unity_id: string,
		values: RecurrentActivityParams
	) => PromiseEither<AbstractError, IActivity[]>;
	findAllActivities: (
		unity_id: string
	) => PromiseEither<AbstractError, IActivity[]>;
	updateActivityById: (
		id: string,
		values: ActivityParams
	) => PromiseEither<AbstractError, IActivity>;
	updateActivityPayment: (
		id: string,
		values: PaymentValues
	) => PromiseEither<AbstractError, IActivity>;
	updateActivityStatusById: (
		id: string,
		status: AppointmentStatus
	) => PromiseEither<AbstractError, IActivity>;
	updateActivityStartedAt: (
		id: string,
		started_at: Date
	) => PromiseEither<AbstractError, IActivity>;
	updateActivityFinishedAt: (
		id: string,
		finished_at: Date
	) => PromiseEither<AbstractError, IActivity>;
	findActivitiesByProf: (
		unity_id: string,
		prof_id: string
	) => PromiseEither<AbstractError, IActivity[]>;
	findActivitiesByClient: (
		unity_id: string,
		client_id: string
	) => PromiseEither<AbstractError, IActivity[]>;
	findActivityById: (id: string) => PromiseEither<AbstractError, IActivity>;
	deleteActivityById: (id: string) => PromiseEither<AbstractError, IActivity>;
}
