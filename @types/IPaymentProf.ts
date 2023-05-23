import { ObjectId } from 'mongoose';

export interface IPaymentProf {
  _id: string | ObjectId;
  value: number;
  percent: number;
  procedure: {
    label: string;
    value: string | ObjectId;
  };
  health_insurance: {
    label: string;
    value: string | ObjectId;
  };
  prof: {
    label: string;
    value: string | ObjectId;
  };
  active: boolean;
  unity_id: string | ObjectId;
  created_at: Date;
  updated_at: Date;
}