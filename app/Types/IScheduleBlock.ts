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
	profId: string
	date: Date
	hourStart: string
	hourEnd: string
	allDay: boolean
}

export type Prof = {
	value: string;
	label: string;
};