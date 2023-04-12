import { model, Schema } from '@ioc:Mongoose';
import { IDirectmail } from 'Types/IDirectmail';


const DirectmailSchema = new Schema<IDirectmail>(
    {
    name: { type: String, required: true },
    description: { type: String, required: true },
    prof: {
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    active: { type: Boolean, required: true },
    unity_id: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

export default model<IDirectmail>('directmails', DirectmailSchema);
