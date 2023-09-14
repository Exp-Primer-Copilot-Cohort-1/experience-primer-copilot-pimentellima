import Mongoose, { Schema } from '@ioc:Mongoose'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

interface IMedicalCertificateModel extends Omit<IMedicalCertificate, 'prof'> {
	prof: Schema.Types.ObjectId
}

const MedicalCertificateSchema = new Schema<IMedicalCertificateModel>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		prof: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
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

MedicalCertificateSchema.index({ unity_id: 1, prof: 1 }, { unique: false })

export default Mongoose.model<IMedicalCertificateModel>(
	'medical_certificates',
	MedicalCertificateSchema,
)
