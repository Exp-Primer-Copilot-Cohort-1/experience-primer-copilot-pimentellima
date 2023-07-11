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

export type RecurrentActivity2 = {
	values: {
		profId: string;
		clientId: string;
		procedures: {
			procedureId: string;
			healthInsuranceId: string;
			val: string;
		}[];
		obs?: string;
	};
	dates: {
		date: string;
		hourStart: string;
		hourEnd: string;
	}[];
};

export type ActivityParams = {
	activityId?: string;
	profId: string;
	clientId: string;
	procedures: ProcedureParams[];
	date: string;
	hourStart: string;
	hourEnd: string;
	obs?: string;
};

export type ProcedureParams = {
	procedureId: string;
	healthInsuranceId: string;
	val: string;
};

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
	payment?: ActivityPayment;
	started_at?: Date;
	finished_at?: Date;
	created_at: Date;
	updated_at: Date;
}

export type ActivityPayment = {
	cost_center: {
		id: string | ObjectId;
		name: string;
	};
	category: {
		id: string | ObjectId;
		name: string;
	};
	value: string;
	paymentForm: string;
	date: string;
	description?: string;
	installment: boolean;
	installments?: string;
};

export interface IActivityPayment {
	bank: {
		id: string | ObjectId;
		name: string;
	};
	cost_center: {
		id: string | ObjectId;
		name: string;
	};
	category: {
		id: string | ObjectId;
		name: string;
	};
	value: string;
	paymentForm: string;
	date: string;
	description?: string;
	installment: boolean;
	installments?: number;
}

export type PaymentValues = {
	activityId: string;
	bankAccountId: string;
	costCenterId: string;
	categoryId: string;
	paid: boolean;
	paymentDate: string;
	paymentForm: string;
	installment: boolean;
	installmentsNumber: number;
	value: string;
	description?: string;
};
