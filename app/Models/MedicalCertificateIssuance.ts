import Mongoose, { Schema } from '@ioc:Mongoose'
import { IMedicalCertificateIssuance } from 'App/Types/IMedicalCertificateIssuance'

const MedicalCertificateIssuance = new Schema<IMedicalCertificateIssuance>(
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

MedicalCertificateIssuance.index({ unity_id: 1, date: 1 }, { unique: false })
MedicalCertificateIssuance.index({ unity_id: 1, 'client.value': 1 }, { unique: false })

export default Mongoose.model<IMedicalCertificateIssuance>(
	'medical_certificate_issuances',
	MedicalCertificateIssuance,
)
