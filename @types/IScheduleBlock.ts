import { ObjectId } from "@ioc:Mongoose"

export interface IScheduleBlock {
    prof: Prof,
    date: Date
	hour_start: string
	hour_end: string
    unity_id: string | ObjectId
    all_day: boolean
    obs?: string
}

export type ScheduleBlockParams = {
    prof: Prof,
    date: string,
	hour_start: string,
	hour_end: string,
    all_day: boolean,
    obs?: string,
}

export type Prof = {
	value: string;
	label: string;
};