import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus, PaymentType } from 'App/Helpers'
import { IAccount } from 'Types/IAccount'

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The account name.
 *           required: true
 *         value:
 *           type: number
 *           description: The account value.
 *           required: true
 *         date:
 *           type: string
 *           format: date
 *           description: The account creation date.
 *           required: true
 *         bank:
 *           type: string
 *           description: The associated bank.
 *           required: true
 *         active:
 *           type: boolean
 *           description: Account status.
 *           default: true
 *         unity_id:
 *           type: string
 *           format: uuid
 *           description: The associated unity id.
 *           required: true
 *         description:
 *           type: string
 *           description: The account description.
 *         status:
 *           type: string
 *           description: The payment status.
 *           enum: [PENDING, PAID]
 *           default: PENDING
 *         type:
 *           type: string
 *           description: The payment type.
 *           enum: [OTHER, TYPE1, TYPE2]
 *           default: OTHER
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The associated user id.
 *         transaction_id:
 *           type: string
 *           description: The associated transaction id.
 *       required:
 *         - name
 *         - value
 *         - date
 *         - bank
 *         - unity_id
 */

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
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IAccount>('accounts', AccountSchema)
