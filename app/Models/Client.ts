import Mongoose, { Schema } from '@ioc:Mongoose'
import type { IUser } from 'Types/IUser'

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         name:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           format: email
 *           required: true
 *         celphone:
 *           type: string
 *           required: true
 *         document:
 *           type: string
 *           required: false
 *         unity_id:
 *           type: string
 *           required: true
 *         active:
 *           type: boolean
 *           default: true
 *         avatar:
 *           type: string
 *         due_date:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */
const ClientSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		celphone: {
			type: String,
			required: true,
		},
		document: {
			type: String,
			required: false,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
		type: {
			type: String,
			default: 'client',
		},
		active: {
			type: Boolean,
			default: true,
		},
		avatar: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IUser>('clients', ClientSchema, 'users')
