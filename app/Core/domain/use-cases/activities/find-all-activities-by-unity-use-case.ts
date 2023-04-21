import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import Activity from '../../entities/activities/activity';

export class FindAllActivitiesByUnityUseCase implements UseCase<string, undefined, Activity[]>
{
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute(): PromiseEither<AbstractError, Activity[]> {
		const activitiesOrErr = await this.activitiesManager.findAllActivitiesByUnityId();
		if(activitiesOrErr.isLeft()) return left(activitiesOrErr.extract());
		const activities = activitiesOrErr.extract();
		return right(activities);

	}
}
