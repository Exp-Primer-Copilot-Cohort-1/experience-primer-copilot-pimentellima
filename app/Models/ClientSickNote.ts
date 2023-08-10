import Mongoose, { Schema } from '@ioc:Mongoose'
import { IClientMedicalCertificate } from 'Types/IClientMedicalCertificate'

const ClientMedicalCertificate = new Schema<IClientMedicalCertificate>(
	{
		client: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		medicalCertificate: {
			name: { type: String, required: true },
			text: { type: String, required: true },
		},
		date: { type: Date, required: true },
		unity_id: { type: String, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IClientMedicalCertificate>(
	'clientMedicalCertificate',
	ClientMedicalCertificate,
)
