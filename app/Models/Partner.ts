import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPartner } from 'App/Types/IPartner'

export const COLLECTION_NAME = 'partners'

const PartnerSchema = new Schema<IPartner>(
	{
		name: { type: String, required: true },
		active: { type: Boolean, default: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

PartnerSchema.index({ unity_id: 1, name: 1 }, { unique: true })

export default Mongoose.model<IPartner>(COLLECTION_NAME, PartnerSchema)
