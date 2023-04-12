import { Document, ObjectId } from '@ioc:Mongoose';

export interface IStock extends Document {
    _id: ObjectId;
    name: string;
    price_cost: number;
    price_final: number;
    quantity: number;
    quantity_add: number;
    date_batch: Date | null;
    batch: string | null;
    stock_automatic: boolean;
    quantity_minimun: number;
    active: boolean;
    unity_id: ObjectId;
    created_at: Date;
    updated_at: Date;
}