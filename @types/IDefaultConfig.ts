import { Document, ObjectId } from '@ioc:Mongoose';

export interface IDefaultConfig extends Document {
    _id: ObjectId;
    days: number;
    active: boolean;
    unity_id: ObjectId;
    created_at: Date;
    updated_at: Date;
}