import { Document, ObjectId } from '@ioc:Mongoose';

export interface IPartner extends Document {
    _id: ObjectId;
    name: string;
    active: boolean;
    unity_id: ObjectId;
    created_at: Date;
    updated_at: Date;
    }