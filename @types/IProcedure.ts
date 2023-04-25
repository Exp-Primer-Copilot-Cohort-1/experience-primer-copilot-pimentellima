import { ObjectId } from '@ioc:Mongoose';
import { IHealthInsurance } from './IHealthInsurance';

export interface IProcedure {
    _id: string;
    active: boolean;
    value: number;
    color: string;
    name: string;
    minutes: number;
    health_insurance: IHealthInsurance[];
    unity_id: string | ObjectId;
    created_at: Date | string;
    updated_at: Date | string;
  }