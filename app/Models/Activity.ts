import Mongoose, { Schema } from "@ioc:Mongoose";
import { AppointmentStatus, PaymentStatus } from "App/Helpers";
import type { IActivity } from "Types/IActivity";

const ActivitySchema = new Schema<IActivity>(
	{
		date: {
			type: Date,
		},
		hour_start: {
			type: String,
		},
		hour_end: {
			type: String,
		},
		status: {
			enum: Object.values(PaymentStatus),
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
					type: Number,
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
						type: Number,
						required: false,
					},
				},
				status: {
					type: String,
					required: true,
					enum: Object.values(PaymentStatus),
					default: PaymentStatus.PENDING,
				},
			},
		],
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
		is_recorrent: {
			type: Boolean,
			required: true,
			default: false,
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
		scheduled: {
			type: String,
			required: true,
			enum: Object.values(AppointmentStatus),
			default: AppointmentStatus.SCHEDULED,
		},
		prof_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		started_at: {
			type: Date,
			required: false,
		},
		finished_at: {
			type: Date,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

export default Mongoose.model<IActivity>("activities", ActivitySchema);
