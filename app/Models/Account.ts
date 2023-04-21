import { model, Schema } from '@ioc:Mongoose'
import { IAccount } from 'Types/IAccount'
import { PaymentStatus, PaymentType } from 'Types/IHelpers'

const AccountSchema = new Schema<IAccount>(
    {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        bank: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        unity_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Unity',
        },
        description: String,
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
        type: {
            type: String,
            enum: Object.values(PaymentType),
            default: PaymentType.OTHER,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        transaction_id: String,
    },
   
  { timestamps: true }
)

export default model<IAccount>('accounts', AccountSchema)
