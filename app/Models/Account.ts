import Mongoose, { Schema } from '@ioc:Mongoose';
import { PaymentStatus, PaymentType } from 'App/Helpers';
import { IAccount } from 'Types/IAccount';

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
			ref: 'unities',
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

	{ timestamps: true },
);

export default Mongoose.model<IAccount>('accounts', AccountSchema);
