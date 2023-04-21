/* eslint-disable @typescript-eslint/naming-convention */
import { AppointmentStatus } from 'Types/IHelpers';
import { AbstractActivity } from '../abstract/activity-abstract';
import { IActivity } from 'Types/IActivities';
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { MissingParamsError } from '../../errors/missing-params';

export class Activity extends AbstractActivity  {
    public date: Date;
    public hour_start: Date;
    public hour_end: Date;
    public schedule_block: boolean;
    public all_day: boolean;
    public is_recorrent: boolean;
    public user_id?: string;
    public scheduled: AppointmentStatus;

    private constructor() {
		super();
	}

    defineDate() : this {return this}
    defineHourStart() : this {return this}
    definehourEnd(): this {return this}
    defineScheduleBlock(): this {return this}
    defineAllDay(): this {return this}
    defineIsRecorrent() : this{return this}
    defineUserId(): this {return this}
    defineScheduled() : this {return this}

    public static async build(data: IActivity) : PromiseEither<AbstractError, Activity> {
        try {
            return right(new Activity())
        }
        catch(err) {
            return left(new MissingParamsError(null as any))
        }
    }

}

export default Activity;
