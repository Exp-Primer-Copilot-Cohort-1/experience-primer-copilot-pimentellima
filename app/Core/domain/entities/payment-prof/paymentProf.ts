import { IPaymentProf } from "Types/IPaymentProf";
import { Entity } from "../abstract/entity.abstract";
import { ObjectId } from "@ioc:Mongoose";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

export class PaymentProfEntity extends Entity implements IPaymentProf {
	private _value: number;
	private _percent: number;
	private _procedure: { label: string; value: string | ObjectId };
	private _health_insurance: { label: string; value: string | ObjectId };
	private _prof: { label: string; value: string | ObjectId };
	private _active: boolean;
	private _unity_id: string | ObjectId;

	get value(): number {
		return this._value;
	}

	get percent(): number {
		return this._percent;
	}

	get procedure(): { label: string; value: string | ObjectId } {
		return this._procedure;
	}

	get health_insurance(): { label: string; value: string | ObjectId } {
		return this._health_insurance;
	}

	get prof(): { label: string; value: string | ObjectId } {
		return this._prof;
	}

	get active(): boolean {
		return this._active;
	}

	get unity_id(): string | ObjectId {
		return this._unity_id;
	}

	defineValue(value: number): PaymentProfEntity {
		this._value = value;
		return this;
	}

	definePercent(percent: number): PaymentProfEntity {
		this._percent = percent;
		return this;
	}

	defineProcedure(procedure: {
		label: string;
		value: string | ObjectId;
	}): PaymentProfEntity {
		this._procedure = procedure;
		return this;
	}

	defineHealthInsurance(health_insurance: {
		label: string;
		value: string | ObjectId;
	}): PaymentProfEntity {
		this._health_insurance = health_insurance;
		return this;
	}

	defineProf(prof: {
		label: string;
		value: string | ObjectId;
	}): PaymentProfEntity {
		this._prof = prof;
		return this;
	}

	defineActive(active: boolean): PaymentProfEntity {
		this._active = active;
		return this;
	}

	defineUnityId(unity_id: string | ObjectId): PaymentProfEntity {
		this._unity_id = unity_id;
		return this;
	}

	public static async build(
		params: IPaymentProf
	): PromiseEither<AbstractError, PaymentProfEntity> {
        try {
            return right(
				new PaymentProfEntity()
				.defineId(params._id?.toString())
				.defineValue(params.value)
				.definePercent(params.percent)
				.defineProcedure(params.procedure)
				.defineHealthInsurance(params.health_insurance)
				.defineProf(params.prof)
				.defineActive(params.active)
				.defineUnityId(params.unity_id)
			)
        }
        catch(error) {
            return left(new AbstractError("", 500));
        }
    }
}
