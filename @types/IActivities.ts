import { Document, ObjectId } from '@ioc:Mongoose';
import { AppointmentStatus, PaymentStatus, STATUS } from '../app/Helpers';

export interface IActivity extends Document {
	_id: ObjectId;
	date: Date;
	hour_start: Date;
	hour_end: Date;
	status: STATUS;
	schedule_block: boolean;
	procedures: {
		value: string;
		label: string;
		minutes: number;
		color: string;
		val: number;
		health_insurance?: {
			value: string;
			label: string;
			price: number;
		};
		status: PaymentStatus;
	}[];
	client: {
		value: string;
		label: string;
		celphone: string | null;
		email: string | null;
		partner: string | null;
	};
	obs: string | null;
	prof: {
		value: string;
		label: string;
	};
	phone: string | null;
	all_day: boolean;
	is_recorrent: boolean;
	active: boolean;
	unity_id: ObjectId;
	user_id?: ObjectId;
	scheduled: AppointmentStatus;
	prof_id: ObjectId;
	created_at: Date;
	updated_at: Date;
}
