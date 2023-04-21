import { Document, ObjectId } from '@ioc:Mongoose';

export interface IProcedure extends Document {
    _id: ObjectId;
    active: boolean;
    value: number;
    color: string;
    name: string;
    minutes: number;
    prof: {
      value: ObjectId;
      label: string;
    }[];
    health_insurance: {
      value: ObjectId;
      label: string;
      price: string;
    }[];
    unity_id: ObjectId;
    created_at: Date;
    updated_at: Date;
  }