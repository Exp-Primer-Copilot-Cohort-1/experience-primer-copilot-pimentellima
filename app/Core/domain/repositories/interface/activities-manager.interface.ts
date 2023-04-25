import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import Activity from '../../entities/activities/activity';
import { IActivity } from 'Types/IActivities';

export interface ActivitiesManagerInterface {
	findAllActivities: (unity_id: string) => PromiseEither<AbstractError, Activity[]>;
	updateActivity: (params: IActivity) => PromiseEither<AbstractError, Activity>;
	findActivitiesByProf : (unity_id: string, prof_id: string) => PromiseEither<AbstractError, Activity[]>;
	findActivitiesByClient: (unity_id: string, client_id: string) => PromiseEither<AbstractError, Activity[]>;
	findActivityById: (id: string) => PromiseEither<AbstractError, Activity>;
	findAndDeleteActivityById: (id: string) => PromiseEither<AbstractError, Activity>;
}
