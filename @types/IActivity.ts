import { ObjectId } from '@ioc:Mongoose';
import { AppointmentStatus, PaymentStatus, STATUS } from '../app/Helpers';
import { IProcedure } from './IProcedure';
import { IClient } from './IClient';
import { IProf } from "Types/IProf";

export interface IActivity
 {
	_id: ObjectId | string;
	date: Date;
	hour_start: string;
	hour_end: string;
	status: PaymentStatus;
	schedule_block: boolean;
	procedures: IProcedure[];
	client_id: string | ObjectId,
	client: IClient;
	obs?: string;
	prof: IProf;
	phone?: string;
	all_day: boolean;
	is_recorrent: boolean;
	active: boolean;
	unity_id: string | ObjectId;
	user_id?: string | ObjectId;
	scheduled: AppointmentStatus;
	prof_id: string | ObjectId;
	started_at: Date;
	finished_at: Date;
	created_at: Date;
	updated_at: Date;
}
