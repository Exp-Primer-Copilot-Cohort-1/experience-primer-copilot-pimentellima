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
	partner?: string;
};

export type Prof = {
	value: string;
	label: string;
};

export interface IAbstractActivity {
	_id: string;
	procedures: Procedure[];
	client: Client;
	obs?: string;
	prof: Prof;
	active: boolean;
	status: PaymentStatus;
	unity_id: string;
	prof_id: string;
	created_at: Date;
	updated_at: Date;
}
