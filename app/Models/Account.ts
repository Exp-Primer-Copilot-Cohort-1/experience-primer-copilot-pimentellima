import Mongoose, { Schema } from '@ioc:Mongoose'
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
 *         cash:
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
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The associated user id.
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
		cash: {
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
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

AccountSchema.index({ unity_id: 1, active: 1 }, { unique: true })

export default Mongoose.model<IAccount>('accounts', AccountSchema)
