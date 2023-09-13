import { ObjectId } from '@ioc:Mongoose';
import { Document } from 'mongoose';


export interface IRoomUser extends Document {
    _id: ObjectId;
    user_id: ObjectId;
    room_id: ObjectId;
    read: boolean;
    created_at: Date;
    updated_at: Date;
}