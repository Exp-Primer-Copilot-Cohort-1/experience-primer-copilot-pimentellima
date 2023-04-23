import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import Activity from 'App/Models/Activity';
import ActivityEntity from '../../entities/activities/activity';
import { MissingParamsError } from '../../errors/missing-params';
import { ActivitiesManagerInterface } from '../interface/activities-manager.interface';

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor(private readonly auth: AuthContract) { }

	async findAllActivitiesByUnityId(): PromiseEither<
		AbstractError,
		ActivityEntity[]
	> {
		if (!this.auth.user?.unity_id)
			return left(new MissingParamsError('unity id'));
		const data = await Activity.find({ unity_id: this.auth.user.unity_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item);
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract();
			}),
		);
		return right(activities);
	}
}
