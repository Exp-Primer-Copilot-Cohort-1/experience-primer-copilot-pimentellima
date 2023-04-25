import { IProcedure } from 'Types/IProcedure';
import { IProf } from "Types/IProf";
import { IHealthInsurance } from 'Types/IHealthInsurance';

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
}
