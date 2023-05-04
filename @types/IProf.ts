import { ObjectId } from "@ioc:Mongoose";

export interface IProf {
	value: string | ObjectId;
	label: string;
}
