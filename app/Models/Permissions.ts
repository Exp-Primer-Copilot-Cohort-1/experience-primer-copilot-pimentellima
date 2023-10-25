import Mongoose, { Schema } from '@ioc:Mongoose'
import { ROLES } from 'App/Roles/types'
import { IPermission } from 'App/Types/IPermission'
import { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'


const PermissionSchema = new Schema<IPermission>(
	{
		blacklist: {
			type: [String],
			default: [],
		},
		permissions: {
			type: [String],
			default: [],
		},
		type: {
			type: String,
			required: true,
			enum: ROLES,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)


export default Mongoose.model<IPermission>('permissions', PermissionSchema, COLLECTION_NAME_USER)
