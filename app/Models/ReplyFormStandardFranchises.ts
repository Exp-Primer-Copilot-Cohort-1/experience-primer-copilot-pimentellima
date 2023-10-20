import Mongoose, { Schema } from '@ioc:Mongoose'
import {
	IReplyFormStandardFranchises
} from "App/Types/IReplyFormStandardFranchises"
import { COLLECTION_NAME as COLLECTION_NAME_ACTIVITY } from './Activity'
import { COLLECTION_NAME as COLLECTION_NAME_FRANCHISES } from './BusinessFranchises'
import { COLLECTION_NAME as COLLECTION_NAME_CLIENTS } from './Client'
import { COLLECTION_NAME as COLLECTION_NAME_UNITIES } from './Unity'
import { COLLECTION_NAME as COLLECTION_NAME_USERS } from './User'


export const COLLECTION_NAME = 'reply_form_standard_franchises'

const schema = new Schema<IReplyFormStandardFranchises
>(
	{
		client: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_NAME_CLIENTS,
			required: true,
		},
		group_id: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['start', 'end'],
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
				_id: false,
				value: {
					type: Schema.Types.ObjectId,
					required: true,
				},
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

schema.index({ unity_id: 1, client: 1, activity: 1, type: 1 }, { unique: true })

export default Mongoose.model<IReplyFormStandardFranchises
>(COLLECTION_NAME, schema)
