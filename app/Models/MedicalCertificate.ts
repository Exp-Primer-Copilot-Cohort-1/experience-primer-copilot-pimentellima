import Mongoose, { Schema } from '@ioc:Mongoose'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { COLLECTION_NAME as COLLECTION_NAME_UNITY } from './Unity'
import { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'
interface IMedicalCertificateModel extends Omit<IMedicalCertificate, 'prof'> {
	prof: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'medical_certificates'

const MedicalCertificateSchema = new Schema<IMedicalCertificateModel>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		prof: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_USER,
			required: true,
		},
		active: {
			type: Boolean,
			required: true
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_UNITY,
			immutable: true,
		},
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
	COLLECTION_NAME,
	MedicalCertificateSchema,
)
