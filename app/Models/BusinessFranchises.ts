import Mongoose, { Schema } from '@ioc:Mongoose'
import { IBusinessFranchises } from 'App/Types/IBusinessFranchises'
import { COLLECTION_NAME as COLLECTION_NAME_UNITIES } from './Unity'
import { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'

export const COLLECTION_NAME = 'business_franchises'

export enum COLLECTION_REFS {
	ADMINS = 'admins',
	UNITIES = 'unities',
	SUPER_ADMINS = 'superAdmins',
}
const BusinessFranchisesSchema = new Schema<IBusinessFranchises>(
	{
		name: { type: String, required: true },
		unities: [{ type: Schema.Types.ObjectId, required: true, ref: COLLECTION_NAME_UNITIES }],
		admins: [{ type: Schema.Types.ObjectId, required: true, ref: COLLECTION_NAME_USER }],
		superAdmins: [{ type: Schema.Types.ObjectId, required: true, ref: COLLECTION_NAME_USER }],
		questions: [
			{
				version: { type: Number, default: 1 },
				type: {
					type: String,
					enum: ['start', 'end'],
					required: true
				},
				min: { type: Number, default: 0 },
				max: { type: Number, default: 5 },
				questions: [
					{
						question: { type: String, required: true },
						description: { type: String, required: false, default: '' },
					},
				],
			},
		]
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

BusinessFranchisesSchema.index({ 'questions.version': 1, 'questions.type': 1 }, { unique: true })

export default Mongoose.model<IBusinessFranchises>(
	COLLECTION_NAME,
	BusinessFranchisesSchema,
)
