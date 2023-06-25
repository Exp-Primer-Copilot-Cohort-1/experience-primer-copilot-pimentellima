import { ObjectId } from "@ioc:Mongoose";
import { AppointmentStatus, PaymentStatus } from "../app/Helpers";

type HealthInsurance = {
	value: string;
	label: string;
	price: string;
};

type Procedure = {
	value: string;
	label: string;
	minutes: number;
	color: string;
	val: string;
	health_insurance: HealthInsurance;
	status: string;
};

type Client = {
	value: string;
	label: string;
	celphone: string;
	email?: string;
	partner?: string | null;
};

type Prof = {
	value: string;
	label: string;
};

export type ActivityParams = {
	_id?: string
	date: string
	hour_start: string
	hour_end: string
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
	val: string;
	health_insurance: HealthInsurance;
}

export interface IActivity {
	_id?: string | ObjectId;
	date: Date;
	hour_start: string;
	hour_end: string;
	status: PaymentStatus;
	procedures: Procedure[];
	client: Client;
	obs?: string;
	prof: Prof;
	is_recorrent: boolean;
	active: boolean;
	unity_id: string | ObjectId;
	scheduled: AppointmentStatus;
	prof_id: string | ObjectId;
	started_at?: Date;
	finished_at?: Date;
	created_at: Date;
	updated_at: Date;
}
