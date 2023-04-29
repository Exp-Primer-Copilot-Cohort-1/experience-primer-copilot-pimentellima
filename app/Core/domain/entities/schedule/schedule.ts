import { PromiseEither, left, right } from "App/Core/shared";
import { Entity } from "../abstract/entity.abstract";
import { AbstractError } from "App/Core/errors/error.interface";
import { InvalidParamsError } from "../../errors/invalid-params-error";
import { z } from "zod";
import { ConflictingScheduleError } from "../../errors/ conflicting-schedule-error";

type appointment = {
    hour_start: Date,
    hour_end: Date,
    date: Date
}

const appointmentSchema = z.object({
    hour_start: z.date(),
    hour_end: z.date(),
    date: z.date(),
});

type ISchedule = {
    prof_id: string,
    appointments: appointment[]
}

export class ScheduleEntity extends Entity {
    private _prof_id: string
    private _appointments: appointment[];

    defineProfId(prof_id: string) : ScheduleEntity {
        this._prof_id = prof_id;
        return this;
    }

    defineAppointments(appointments: appointment[]) : ScheduleEntity {
        this._appointments = appointments;
        return this;
    }

    public get prof_id(): string {
        return this._prof_id
    }

    public get appointments(): appointment[] {
        return this._appointments;
    }

    public async addAppointment(newApp : appointment): PromiseEither<AbstractError, ScheduleEntity> {
        try {
            appointmentSchema.parse(newApp);
            for(const appointment of this._appointments) {
                if(newApp.hour_start >= appointment.hour_start &&
                newApp.hour_end <= appointment.hour_end
                ) return left(new ConflictingScheduleError());
            }
            return right(this);
        }
        catch(err) {
            return left(new InvalidParamsError(err));
        }
    } 

    public static async build(params: ISchedule) : PromiseEither<AbstractError, ScheduleEntity> {
        try {
            z.object({
                prof_id: z.string(),
                appointments: z.array(appointmentSchema).default([])
            }).parse({
                prof_id: params.prof_id,
                appointments: params.appointments
            });


            return right(new ScheduleEntity()
                .defineProfId(params.prof_id)
                .defineAppointments(params.appointments)
            )
        }
        catch(err) {
            return left(new InvalidParamsError(err));
        }
    }
}