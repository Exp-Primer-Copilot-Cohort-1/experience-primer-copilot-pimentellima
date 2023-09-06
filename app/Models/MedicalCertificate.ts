import Mongoose, { Schema } from '@ioc:Mongoose'
import { IMedicalCertificate } from 'Types/IMedicalCertificate'

const MedicalCertificateSchema = new Schema<IMedicalCertificate>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		prof: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

MedicalCertificateSchema.index({ unity_id: 1, name: 1, active: 1 }, { unique: false })

MedicalCertificateSchema.index(
	{ unity_id: 1, 'prof.value': 1, active: 1 },
	{ unique: false },
)

export default Mongoose.model<IMedicalCertificate>(
	'medical_certificate',
	MedicalCertificateSchema,
)
