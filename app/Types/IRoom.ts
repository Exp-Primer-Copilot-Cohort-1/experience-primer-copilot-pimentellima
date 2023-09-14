import { Document, ObjectId } from '@ioc:Mongoose';

export interface IRoom extends Document {
    _id: ObjectId;
    active: boolean;
    unity_id: ObjectId;
    support: boolean;
    created_at: Date;
    updated_at: Date;
}

