import { ObjectId } from "@ioc:Mongoose";

export interface IPrescription {
	_id: ObjectId;
	name: string;
	client: {
		value: string;
		label: string;
	};
	prof: {
		value: string;
		label: string;
	};
	text: string
	active: boolean;
	unity_id: string | ObjectId;
	created_at: Date;
	updated_at: Date;
}
