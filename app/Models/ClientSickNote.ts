import Mongoose, { Schema } from "@ioc:Mongoose";
import { IClientSickNote } from "Types/IClientSickNote";

const ClientSickNote = new Schema<IClientSickNote>(
	{
		client: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		sickNote: {
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

export default Mongoose.model<IClientSickNote>(
	"clientSickNotes",
	ClientSickNote
);
