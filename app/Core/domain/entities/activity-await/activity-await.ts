/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivityAwait } from "Types/IActivityAwait";
import { AbstractActivity } from "../abstract/activity-abstract";

export class ActivityAwaitEntity extends AbstractActivity implements IActivityAwait {

	public static async build(
		params: IActivityAwait
	): PromiseEither<AbstractError, ActivityAwaitEntity> {
		try {
			return right(
				new ActivityAwaitEntity()
					.defineId(params._id?.toString())
					.defineStatus(params.status)
					.defineProcedures(params.procedures)
					.defineClient(params.client)
					.defineObs(params.obs)
					.defineProf(params.prof)
					.defineActive(params.active)
					.defineUnityId(params.unity_id?.toString())
					.defineProfId(params.prof_id?.toString())
			);
		} catch (err) {
			console.log(err)
			return left(err);
		}
	}
}

export default ActivityAwaitEntity;
