import { ObjectId } from '@ioc:Mongoose';

export interface IMedicalCertificate {
	_id: ObjectId;
	name: string;
	description: string;
	prof: {
		value: string;
		label: string;
	};
	active: boolean;
	unity_id: ObjectId;
	created_at: Date;
	updated_at: Date;
}
