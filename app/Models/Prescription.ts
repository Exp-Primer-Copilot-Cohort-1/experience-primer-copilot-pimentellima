import Mongoose, { Schema } from "@ioc:Mongoose";
import { IPrescription } from "IPrescription";

const PrescriptionSchema = new Schema<IPrescription>(
	{
		name: {
			type: String,
			required: true,
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
		text: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: false,
			default: true
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

export default Mongoose.model<IPrescription>(
	"prescriptions",
	PrescriptionSchema,
	"prescriptions"
);
