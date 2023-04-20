import { ObjectId } from '@ioc:Mongoose';

export type IAdminUser = {
	_id: string | ObjectId;
	is_company: boolean;
	unity_id: string;
	name: string;
	date_expiration: string;
	password: string;
	active: boolean;
	email: string;
	document: string;
	celphone: string;
	type: 'admin' | 'admin_prof';
};
