import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import Activity from 'App/Models/Activity';
import ActivityEntity from '../../entities/activities/activity';
import { MissingParamsError } from '../../errors/missing-params';
import {
    ActivitiesManagerInterface
} from '../interface/activities-manager.interface';
import { ActivityNotFoundError } from '../../errors/activity-not-found,';
import { STATUS } from 'App/Helpers';
import { IActivity } from 'Types/IActivities';

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() { }

    async findAllActivitiesByUnityId (unity_id: string) : PromiseEither<AbstractError, ActivityEntity[]> {
        if(!unity_id) return left(new MissingParamsError('unity id'));

        const data = await Activity.find({ unity_id });
        const activities = await Promise.all(data.map(async item => {
            const activityOrErr = await ActivityEntity.build(item);
            if(activityOrErr.isLeft()) {
                return {} as ActivityEntity;
            }
            return activityOrErr.extract();
        }))
        return right(activities);
    }

    async updateActivity (params: IActivity) : PromiseEither<AbstractError, ActivityEntity> {
        if(!params._id) return left(new MissingParamsError('id'));
        const oldActivity = await Activity.findOne({ _id: params._id });
        if(!oldActivity) return left(new ActivityNotFoundError());
        
        const update = {
            ...params, 
            status: params.status !== oldActivity.status ? STATUS.RESCHEDULED : oldActivity.status 
        }
        const updatedActivity = await Activity.findOneAndUpdate({ _id: params._id }, update, { new: true });
        return right(updatedActivity);
    }
}
