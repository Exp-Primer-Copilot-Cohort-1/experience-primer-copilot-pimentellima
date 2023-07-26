/* eslint-disable @typescript-eslint/naming-convention */

import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { PaymentStatus } from "App/Helpers";
import Client from "App/Models/Client";
import HealthInsurance from "App/Models/HealthInsurance";
import Procedure from "App/Models/Procedure";
import User from "App/Models/User";
import { ActivityPendingValues, IActivityPending } from "Types/IActivity";
import { IUser } from "Types/IUser";
import * as z from "zod";
import { AbstractActivity } from "../abstract/activity-abstract";

export class ActivityPendingEntity
	extends AbstractActivity
	implements IActivityPending
{
	private _type: "pending";
	private _group_id: string;

	public get type() {
		return this._type;
	}

	public get group_id() {
		return this._group_id;
	}

	defineGroupId(group_id: string): ActivityPendingEntity {
		this._group_id = group_id;
		return this;
	}

	defineType(type: "pending"): ActivityPendingEntity {
		this._type = type;
		return this;
	}

	public static async build(
		params: ActivityPendingValues
	): PromiseEither<AbstractError, ActivityPendingEntity> {
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
					})
				),
				obs: z.string().optional(),
			}).parse(params);

			return right(
				new ActivityPendingEntity()
					.defineProcedures(params.procedures)
					.defineClient(params.client)
					.defineType("pending")
					.defineObs(params.obs)
					.defineProf(params.prof)
					.defineActive(true)
					.defineProfId(params.prof.value)
			);
		} catch (err) {
			console.log(err);
			return left(err);
		}
	}
}

export default ActivityPendingEntity;
