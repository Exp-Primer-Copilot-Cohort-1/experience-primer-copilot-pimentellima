/* eslint-disable @typescript-eslint/naming-convention */

import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityAwaitValues, IActivityAwait } from 'App/Types/IActivity'
import * as z from 'zod'
import { AbstractActivity } from '../abstract/activity-abstract'

export class ActivityAwaitEntity extends AbstractActivity implements IActivityAwait {
	private _type: 'await'

	public get type() {
		return this._type
	}

	defineType(type: 'await'): ActivityAwaitEntity {
		this._type = type
		return this
	}

	public static async build(
		params: ActivityAwaitValues,
	): PromiseEither<AbstractError, ActivityAwaitEntity> {
		try {
			z.object({
				prof: z.object({
					value: z.string(),
					label: z.string(),
				}),
				client: z.object({
					value: z.string(),
					label: z.string(),
				}),
				procedures: z.array(
					z.object({
						value: z.string(),
						label: z.string(),
					}),
				),
				obs: z.string().optional(),
			}).parse(params)

			return right(
				new ActivityAwaitEntity()
					.defineProcedures(params.procedures)
					.defineClient(params.client)
					.defineObs(params.obs)
					.defineType('await')
					.defineProf(params.prof)
					.defineActive(true)
					.defineProfId(params.prof.value),
			)
		} catch (err) {
			console.log(err)
			return left(err)
		}
	}
}

export default ActivityAwaitEntity
