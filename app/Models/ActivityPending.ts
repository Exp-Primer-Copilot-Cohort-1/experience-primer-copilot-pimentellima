import Mongoose, { Schema } from "@ioc:Mongoose";
import { PaymentStatus } from "App/Helpers";
import { IActivityPending } from "Types/IActivity";

const ActivityPendingSchema = new Schema<IActivityPending>(
	{
		status: {
			type: String,
			required: true,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		procedures: [
			{
				value: {
					type: String,
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
						type: String,
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
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			celphone: {
				type: String,
				required: false,
				default: null,
			},
			email: {
				type: String,
				required: false,
				default: null,
			},
			partner: {
				type: String,
				required: false,
				default: null,
			},
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
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

		prof_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: "pending",
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

export default Mongoose.model<IActivityPending>(
	"activities_pending",
	ActivityPendingSchema,
	"activities"
);
