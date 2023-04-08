import { model, Schema } from '@ioc:Mongoose';
import { IPartner } from 'Types/IPartner';

const PartnerSchema = new Schema<IPartner>(
    {
    
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    unity_id: { type: Schema.Types.ObjectId, required: true },
    
    
    },
    { timestamps: true }
);

export default model<IPartner>('partners', PartnerSchema);
