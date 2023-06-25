/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ActivityAwaitParams, IActivityAwait } from "Types/IActivityAwait";
import { AbstractActivity } from "../abstract/activity-abstract";
import * as z from "zod";
import { PaymentStatus } from "App/Helpers";

export class ActivityAwaitEntity
	extends AbstractActivity
	implements IActivityAwait
{
	public static async build(
		params: ActivityAwaitParams
	): PromiseEither<AbstractError, ActivityAwaitEntity> {
		try {
			const parsedParams = z
				.object({
					prof: z.object({
						value: z.string(),
						label: z.string(),
					}),
					prof_id: z.string(),
					client: z.object({
						value: z.string(),
						label: z.string(),
						celphone: z.string(),
						email: z.string().optional(),
						partner: z.string().nullable().optional(),
					}),
					procedures: z.array(
						z
							.object({
								value: z.string(),
								health_insurance: z.object({
									value: z.string(),
									price: z.string(),
									label: z.string(),
								}),
								val: z.string().regex(/\d{0,2}(\,\d{1,2})?/),
								minutes: z.number(),
								label: z.string(),
								color: z.string(),
							})
							.transform((val) => ({
								...val,
								status: "A RECEBER",
							}))
					),
					obs: z.string().optional(),
				})
				.parse(params);
			return right(
				new ActivityAwaitEntity()
					.defineStatus(PaymentStatus.PENDING)
					.defineProcedures(parsedParams.procedures)
					.defineClient(parsedParams.client)
					.defineObs(parsedParams.obs)
					.defineProf(parsedParams.prof)
					.defineActive(true)
					.defineProfId(parsedParams.prof_id?.toString())
			);
		} catch (err) {
			console.log(err);
			return left(err);
		}
	}
}

export default ActivityAwaitEntity;
