import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityPending, STATUS_ACTIVITY } from 'App/Types/IActivity'
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
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'procedures',
				},
				minutes: {
					type: Number,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				price: {
					type: String,
					required: true,
				},
				health_insurance: {
					type: Schema.Types.ObjectId,
					required: false,
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
			ref: 'clients',
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users',
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
		type: {
			type: String,
			required: false,
			default: STATUS_ACTIVITY.PENDING,
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
