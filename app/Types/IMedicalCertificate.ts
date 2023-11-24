import { ObjectId } from '@ioc:Mongoose';
import { Generic } from './ITransaction';

export interface IMedicalCertificate {
	id?: ObjectId | string;
	name: string;
	description: string;
	prof: Generic;
	active: boolean;
	unity_id: ObjectId;
	created_at: Date;
	updated_at: Date;
}
