import { ObjectId } from "@ioc:Mongoose";
import { PaymentStatus } from "App/Helpers";

export type HealthInsurance = {
	value: string;
	label: string;
	price: string;
};

export type Procedure = {
	value: string;
	label: string;
	minutes: number;
	color: string;
	val: string;
	health_insurance: HealthInsurance;
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

export interface IAbstractActivity {
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
