import Moongose, { Schema } from '@ioc:Mongoose'
import { IPartner } from 'Types/IPartner'

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

export default Moongose.model<IPartner>('partners', PartnerSchema)
