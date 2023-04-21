import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import Activity from '../../entities/activities/activity';

export interface ActivitiesManagerInterface {
	findAllActivitiesByUnityId: () => PromiseEither<AbstractError, Activity[]>;
}
