import Mongoose, { Schema } from '@ioc:Mongoose'
import { IBusinessFranchises } from 'Types/IBusinessFranchises'

const COLLECTION_NAME = 'business_franchises'

const BusinessFranchisesSchema = new Schema<IBusinessFranchises>(
	{
		name: { type: String, required: true },
		unities: [{ type: Schema.Types.ObjectId, required: true }],
		admins: [{ type: Schema.Types.ObjectId, required: true }],
		superAdmins: [{ type: Schema.Types.ObjectId, required: true }],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IBusinessFranchises>(
	COLLECTION_NAME,
	BusinessFranchisesSchema,
)
