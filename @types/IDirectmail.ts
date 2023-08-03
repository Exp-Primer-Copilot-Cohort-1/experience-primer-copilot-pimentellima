import { ObjectId } from '@ioc:Mongoose';

export interface IDirectmail {
	_id: ObjectId;
	name: string;
	description: string;
	prof: {
		value: string;
		label: string;
	};
	client: {
		value: string,
		label: string
	}
	active: boolean;
	unity_id: ObjectId;
	created_at: Date;
	updated_at: Date;
}
