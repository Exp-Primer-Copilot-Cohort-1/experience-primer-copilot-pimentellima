/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { PaymentStatus } from "App/Helpers";
import Client from "App/Models/Client";
import HealthInsurance from "App/Models/HealthInsurance";
import Procedure from "App/Models/Procedure";
import User from "App/Models/User";
import { ActivityAwaitParams, IActivityAwait } from "Types/IActivityAwait";
import { IUser } from "Types/IUser";
import * as z from "zod";
import { AbstractActivity } from "../abstract/activity-abstract";

export class ActivityAwaitEntity
	extends AbstractActivity
	implements IActivityAwait
{
	public static async build(
		params: ActivityAwaitParams
	): PromiseEither<AbstractError, ActivityAwaitEntity> {
		try {
			z.object({
				profId: z.string(),
				clientId: z.string(),
				procedures: z.array(
					z.object({
						procedureId: z.string(),
						healthInsuranceId: z.string(),
						val: z.string().regex(/\d{0,2}(\,\d{1,2})?/),
					})
				),
				obs: z.string().optional(),
			}).parse(params);

			const profData = (await User.findById(params.profId)) as IUser;
			if (!profData)
				return left(new AbstractError("Could not find prof", 404));

			const clientData = await Client.findById(params.clientId);
			if (!clientData)
				return left(new AbstractError("Could not find client", 404));
			const client = {
				value: params.clientId,
				label: clientData.name,
				celphone: clientData.celphone,
				email: clientData.email,
				partner: clientData.partner,
			};

			const prof = {
				value: params.profId,
				label: profData.name,
			};

			const procedures = await Promise.all(
				params.procedures.map(async (procedure) => {
					const { procedureId, healthInsuranceId, val } = procedure;
					const procedureData = await Procedure.findById(procedureId);
					const healthInsuranceData = await HealthInsurance.findById(
						healthInsuranceId
					);
					if (!procedureData || !healthInsuranceData) throw Error;
					const healthInsurancePrice =
						procedureData.health_insurance.find(
							(i) => i.value === healthInsuranceId
						)?.price || "";
					return {
						value: procedureId,
						label: procedureData.name,
						color: procedureData.color,
						minutes: procedureData.minutes,
						val,
						status: PaymentStatus.PENDING,
						health_insurance: {
							value: healthInsuranceId,
							label: healthInsuranceData.name,
							price: healthInsurancePrice,
						},
					};
				})
			);

			return right(
				new ActivityAwaitEntity()
					.defineStatus(PaymentStatus.PENDING)
					.defineProcedures(procedures)
					.defineClient(client)
					.defineObs(params.obs)
					.defineProf(prof)
					.defineActive(true)
					.defineProfId(params.profId)
			);
		} catch (err) {
			console.log(err);
			return left(err);
		}
	}
}

export default ActivityAwaitEntity;
