import { PromiseEither, left, right } from 'App/Core/shared/either';
import { ActivitiesManagerInterface } from '../interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import Activity from '../../entities/activities/activity';
import { MissingParamsError } from '../../errors/missing-params';

export class ActivityInMemoryRepository implements ActivitiesManagerInterface {
	private items: Activity[] = [];

	constructor() { }
	async findAllActivitiesByUnityId (unity_id: string): PromiseEither<AbstractError, Activity[]> {
        if(!unity_id) return left(new MissingParamsError('unity id'));

		return right(this.items.filter(item => item.unity_id.toString() === unity_id));
	}
	
}
