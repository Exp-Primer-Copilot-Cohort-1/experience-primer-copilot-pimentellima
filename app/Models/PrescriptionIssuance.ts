import Mongoose, { Schema } from "@ioc:Mongoose";
import { IPrescriptionIssuance } from "Types/IPrescriptionIssuance";

const PrescriptionIssuance = new Schema<IPrescriptionIssuance>(
	{
		client: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		prescription: {
			name: { type: String, required: true },
			text: { type: String, required: true },
		},
		date: { type: Date, required: true },
		unity_id: { type: String, required: true },
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

export default Mongoose.model<IPrescriptionIssuance>(
	"prescriptionIssuances",
	PrescriptionIssuance
);
