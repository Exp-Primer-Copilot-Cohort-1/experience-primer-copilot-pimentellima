import { PromiseEither, left, right } from 'App/Core/shared/either';
import { ActivitiesManagerInterface } from '../interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import ActivityEntity from '../../entities/activities/activity';
import { MissingParamsError } from '../../errors/missing-params';

export class ActivityInMemoryRepository implements ActivitiesManagerInterface {
	private items: ActivityEntity[] = [];

	constructor() { }
	async findAllActivities (unity_id: string): PromiseEither<AbstractError, ActivityEntity[]> {
        if(!unity_id) return left(new MissingParamsError('unity id'));

		return right(this.items.filter(item => item.unity_id.toString() === unity_id));
	}
	
}
