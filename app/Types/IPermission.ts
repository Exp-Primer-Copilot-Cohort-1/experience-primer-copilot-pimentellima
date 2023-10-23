import { ObjectId } from '@ioc:Mongoose';

export interface IPermission {
	_id: ObjectId | string;
	type: string;
	blacklist: string[];
	permissions: string[];
	created_at: Date;
	updated_at: Date;
}