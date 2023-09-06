import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentActivity } from 'Types/ITransaction'

const ActivityPaymentSchema = new Schema<IPaymentActivity>({
	activityId: {
		type: String,
		required: true,
	},
	bankAccountId: {
		type: String,
		required: true,
	},
	costCenterId: {
		type: String,
		required: true,
	},
	categoryId: {
		type: String,
		required: true,
	},
	paid: {
		type: Boolean,
		required: true,
	},
	paymentDate: {
		type: String,
		required: true,
	},
	paymentForm: {
		type: String,
		required: true,
	},
	installment: {
		type: Boolean,
		required: true,
	},
	installmentsNumber: {
		type: Number,
		required: true,
	},
	installmentCurrent: {
		type: Number,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
})

export default Mongoose.model<IPaymentActivity>('activities', ActivityPaymentSchema)
