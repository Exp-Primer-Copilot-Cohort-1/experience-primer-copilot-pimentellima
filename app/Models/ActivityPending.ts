import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityPending } from 'App/Types/IActivity'
import { COLLECTION_NAME } from './Activity'

interface IActivityPendingModel extends Omit<IActivityPending, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId
	client: Schema.Types.ObjectId
}
const ActivityPendingSchema = new Schema<IActivityPendingModel>(
	{
		group_id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		procedures: [
			{
				value: {
					type: Schema.Types.ObjectId,
					required: true,
				},
				label: {
					type: String,
					required: true,
				},
				minutes: {
					type: Number,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				val: {
					type: String,
					required: true,
				},
				health_insurance: {
					value: {
						type: Schema.Types.ObjectId,
						required: false,
					},
					label: {
						type: String,
						required: false,
					},
					price: {
						type: String,
						required: false,
					},
				},
			},
		],
		payment: {
			required: false,
			default: {},
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: 'pending',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IActivityPendingModel>(
	'activities_pending',
	ActivityPendingSchema,
	COLLECTION_NAME,
)
