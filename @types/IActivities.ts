import { ObjectId } from '@ioc:Mongoose';
import { AppointmentStatus, STATUS } from '../app/Helpers';
import { IProcedure } from './IProcedure';
import { IClient } from './IClient';
import { IProf } from "Types/IProf";

export interface IActivity
 {
	_id: ObjectId;
	date: Date;
	hour_start: Date;
	hour_end: Date;
	status: STATUS;
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
	created_at: Date;
	updated_at: Date;
}
