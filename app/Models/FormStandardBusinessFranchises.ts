import Mongoose, { Schema } from '@ioc:Mongoose'
import { IFormStandardBusinessFranchises } from 'App/Types/IFormStandardBusinessFranchises'
import { COLLECTION_NAME as COLLECTION_NAME_ACTIVITY } from './Activity'
import { COLLECTION_NAME as COLLECTION_NAME_FRANCHISES } from './BusinessFranchises'
import { COLLECTION_NAME as COLLECTION_NAME_CLIENTS } from './Client'
import { COLLECTION_NAME as COLLECTION_NAME_UNITIES } from './Unity'
import { COLLECTION_NAME as COLLECTION_NAME_USERS } from './User'

export const COLLECTION_NAME = 'form_standard_business_franchises'

const ClientSchema = new Schema<IFormStandardBusinessFranchises>(
	{
		client: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_CLIENTS,
			required: true,
		},
		prof: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_USERS,
			required: true,
		},
		franchise: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_FRANCHISES,
			required: true,
		},
		activity: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_ACTIVITY,
			required: true,
		},
		questions: [
			{
				question: {
					type: String,
					required: true,
				},
				answer: {
					type: Number,
					min: 0,
					max: 100,
					required: true,
				},
			},
		],
		version: {
			type: Number,
			default: 1,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_UNITIES,
			required: true,
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IFormStandardBusinessFranchises>(COLLECTION_NAME, ClientSchema)
