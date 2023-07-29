import { Document, ObjectId } from '@ioc:Mongoose';

export interface IStock extends Document {
    _id: ObjectId;
    name: string;
    batches: {
        name: string,
        quantity: number;
        minimum_quantity: number
        date_batch: Date;
        price_cost: string;
        price_final: string;
    }[]
    stock_automatic: boolean;
    active: boolean;
    unity_id: ObjectId;
    created_at: Date;
    updated_at: Date;
}

export type StockValues = {
    name: string;
    batches: {
        name: string,
        quantity: number;
        minimum_quantity: number
        date_batch: Date;
        price_cost: string;
        price_final: string;
    }[]
    stock_automatic: boolean;
}