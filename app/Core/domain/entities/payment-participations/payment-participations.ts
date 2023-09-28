import { ObjectId } from "@ioc:Mongoose";
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IPaymentProf } from "App/Types/IPaymentProf";
import { Generic } from "App/Types/ITransaction";
import { Entity } from "../abstract/entity.abstract";

type GenericHealthInsurance = Generic & { amount: number };

export class PaymentParticipationsEntity extends Entity implements IPaymentProf {
	abs: number;
	percent: number;
	procedure: Generic;
	health_insurance: GenericHealthInsurance;
	prof: Generic;
	active: boolean;
	unity_id: string | ObjectId;

	defineAbs(abs: number): this {
		this.abs = abs;
		return this;
	}

	definePercent(percent: number): this {
		this.percent = percent;
		return this;
	}

	defineProcedure(procedure: Generic): this {
		this.procedure = procedure;
		return this;
	}

	defineHealthInsurance(health_insurance: GenericHealthInsurance): this {
		this.health_insurance = health_insurance;
		return this;
	}

	defineProf(prof: Generic): this {
		this.prof = prof;
		return this;
	}

	defineActive(active: boolean): this {
		this.active = active;
		return this;
	}

	defineUnityId(unity_id: string | ObjectId): this {
		this.unity_id = unity_id;
		return this;
	}

	public static async build(
		params: IPaymentProf
	): PromiseEither<AbstractError, PaymentParticipationsEntity> {
		try {
			return right(
				new this()
					.defineId(params._id?.toString())
					.defineAbs(params.abs)
					.definePercent(params.percent)
					.defineProcedure(params.procedure as Generic)
					.defineHealthInsurance(params.health_insurance as GenericHealthInsurance)
					.defineProf(params.prof as Generic)
					.defineActive(params.active)
					.defineUnityId(params.unity_id)
			)
		}
		catch (error) {
			return left(new AbstractError("", 500));
		}
	}
}
