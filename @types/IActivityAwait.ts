import { ObjectId } from "@ioc:Mongoose";
import { PaymentStatus } from "App/Helpers";

export type HealthInsurance = {
	value: string;
	label: string;
	price: number;
};

export type Procedure = {
	value: string;
	label: string;
	minutes: number;
	color: string;
	val: number;
	health_insurance: HealthInsurance;
	status: string;
};

export type Client = {
	value: string;
	label: string;
	celphone: string;
	email?: string;
	partner?: string | null;
};

export type Prof = {
	value: string;
	label: string;
};

export interface IActivityAwait {
	_id: string | ObjectId;
	procedures: Procedure[];
	client: Client;
	obs?: string;
	prof: Prof;
	active: boolean;
	status: PaymentStatus;
	unity_id: string | ObjectId;
	prof_id: string | ObjectId;
	created_at: Date;
	updated_at: Date;
}

export type ActivityAwaitParams = {
	_id?: string
	procedures: ProcedureParams[]
	client: Client
	obs?: string
	prof: Prof
	prof_id: string
}

type ProcedureParams = {
	value: string;
	label: string;
	minutes: number;
	color: string;
	val: number;
	health_insurance: HealthInsurance;
}