import { ObjectId } from "@ioc:Mongoose";
import { AppointmentStatus, PaymentStatus } from "../app/Helpers";

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

type ActivityPayment = {
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
	installment: boolean;
	installments?: string;
	description?: string;
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

export interface IActivityAwait {
	_id: string | ObjectId;
	procedures: Procedure[];
	type: "await";
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

export interface IActivityPending {
	_id: string | ObjectId;
	group_id: string,
	procedures: Procedure[];
	type: "pending";
	client: Client;
	obs?: string;
	prof: Prof;
	active: boolean;
	status: PaymentStatus;
	payment?: ActivityPayment;
	unity_id: string | ObjectId;
	prof_id: string | ObjectId;
	created_at: Date;
	updated_at: Date;
}

export interface IActivity {
	_id?: string | ObjectId;
	type: "marked";
	date: Date;
	hour_start: string;
	hour_end: string;
	status: PaymentStatus;
	procedures: Procedure[];
	client: Client;
	prof: Prof;
	active: boolean;
	unity_id: string | ObjectId;
	scheduled: AppointmentStatus;
	prof_id: string | ObjectId;
	payment?: ActivityPayment;
	obs?: string;
	started_at?: Date;
	finished_at?: Date;
	created_at: Date;
	updated_at: Date;
}

type DateValues = {
	date: string;
	hourStart: string;
	hourEnd: string;
};

type ProcedureValues = {
	procedureId: string;
	healthInsuranceId: string;
	val: string;
};

export type ActivityValues = {
	activityId?: string;
	profId: string;
	clientId: string;
	procedures: ProcedureValues[];
	obs?: string;
} & DateValues;

export type ActivityAwaitValues = {
	activityId?: string;
	profId: string;
	clientId: string;
	procedures: ProcedureValues[];
	obs?: string;
};

export type ActivityPendingValues = {
	activityId?: string;
	profId: string;
	clientId: string;
	procedures: ProcedureValues[];
	obs?: string;
};

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

export type RecurrentActivityValues = {
	pending: number;
	values: {
		profId: string;
		clientId: string;
		procedures: ProcedureValues[];
		obs?: string;
	};
	dates: DateValues[];
};
