import { Document, ObjectId } from 'mongoose';

export interface IPaymentProf extends Document {
  _id: ObjectId;
  value: number;
  percent: number;
  procedure: {
    label: string;
    value: ObjectId;
  };
  health_insurance: {
    label: string;
    value: ObjectId;
  };
  prof: {
    label: string;
    value: ObjectId;
  };
  active: boolean;
  unity_id: ObjectId;
  created_at: Date;
  updated_at: Date;
}