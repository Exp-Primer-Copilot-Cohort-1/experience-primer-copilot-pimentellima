import { IProcedure } from 'Types/IProcedure';
import { IProf } from "Types/IProf";
import { IHealthInsurance } from 'Types/IHealthInsurance';
import { z } from 'zod';
import { PaymentStatus } from 'App/Helpers';
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { InvalidParamsError } from '../../errors/invalid-params-error';

export class ProcedureEntity implements IProcedure {
    _id: string;
    active: boolean;
    value: number;
    color: string;
    name: string;
    minutes: number;
    prof: IProf[];
    health_insurance: IHealthInsurance[];
    unity_id: string;
    created_at: Date;
    updated_at: Date;
    __v?: any;

    defineId(id: string): this {
        this._id = id;
        return this;
    }
    
    defineActive(active: boolean): this {
        this.active = active;
        return this;
    }
    
    defineValue(value: number): this {
        this.value = value;
        return this;
    }
    
    defineColor(color: string): this {
        this.color = color;
        return this;
    }
    
    defineName(name: string): this {
        this.name = name;
        return this;
    }
    
    defineMinutes(minutes: number): this {
        this.minutes = minutes;
        return this;
    }
    
    defineProf(prof: IProf[]): this {
        this.prof = prof;
        return this;
    }
    
    defineHealthInsurance(health_insurance: IHealthInsurance[]): this {
        this.health_insurance = health_insurance;
        return this;
    }
    
    defineUnityId(unity_id: string): this {
        this.unity_id = unity_id;
        return this;
    }
    
    defineCreatedAt(created_at: Date): this {
        this.created_at = created_at;
        return this;
    }
    
    defineUpdatedAt(updated_at: Date): this {
        this.updated_at = updated_at;
        return this;
    }

    public static async build(params: IProcedure) : PromiseEither<AbstractError, ProcedureEntity> {
        try {
            const schema = z.object({
                value: z.string(),
                label: z.string(),
                minutes: z.number(),
                color: z.string(),
                val: z.number(),
                status: z.nativeEnum(PaymentStatus),
            })
            schema.parse(params);
            return right(new ProcedureEntity()
                .defineId(params._id)
                .defineActive(params.active)
                .defineValue(params.value)
                .defineName(params.name)
                .defineColor(params.color)
                .defineProf(params.prof)
                .defineMinutes(params.minutes)
                .defineHealthInsurance(params.health_insurance)
                .defineUnityId(params.unity_id.toString())
                .defineCreatedAt()
                .defineUpdatedAt()
                )
        }
        catch(error) {
            return left(new InvalidParamsError())
        }
    }
}