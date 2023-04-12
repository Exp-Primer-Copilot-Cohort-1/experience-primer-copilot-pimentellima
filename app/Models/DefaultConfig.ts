import { model, Schema } from '@ioc:Mongoose';
import { IDefaultConfig } from 'Types/IDefaultConfig';

const DefaultConfigSchema = new Schema<IDefaultConfig>(
    {
        days: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        unity_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'unities',
        },
    },
    { timestamps: true }
);

export default model<IDefaultConfig>('default_configs', DefaultConfigSchema);