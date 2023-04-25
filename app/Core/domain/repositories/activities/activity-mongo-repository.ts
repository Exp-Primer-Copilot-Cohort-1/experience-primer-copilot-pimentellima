import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import Activity from 'App/Models/Activity';
import ActivityEntity from '../../entities/activities/activity';
import { MissingParamsError } from '../../errors/missing-params';
import {
    ActivitiesManagerInterface
} from '../interface/activities-manager.interface';
import { ActivityNotFoundError } from '../../errors/activity-not-found,';
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
        const oldActivity = await Activity.findOne({ 
            _id: params._id 
        });
        if(!oldActivity) return left(new ActivityNotFoundError());
        const newActivityOrErr = await ActivityEntity.build({ 
            ...oldActivity.toObject(),
            ...params
        });
        if(newActivityOrErr.isLeft()) return left(new AbstractError("Invalid params", 400));
        const newActivity = newActivityOrErr.extract();
        
        await Activity.findOneAndUpdate({ _id: params._id }, newActivity.params());
        return right(newActivity);
    }
}
