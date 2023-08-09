import Mongoose, { Schema } from "@ioc:Mongoose";
import { IClientPrescription } from "Types/IClientPrescription";

const ClientPrescription = new Schema<IClientPrescription>(
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

export default Mongoose.model<IClientPrescription>(
	"clientPrescriptions",
	ClientPrescription
);
