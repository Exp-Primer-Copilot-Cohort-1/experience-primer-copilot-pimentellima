import Mongoose, { ObjectId, Schema } from '@ioc:Mongoose'

export const COLLECTION_NAME = 'clients'

interface ISharedAnswer {
	shared_by: ObjectId
	shared_with: ObjectId
	client: ObjectId
	start: Date
	end: Date
	unity_id: ObjectId
}

const SharedAnswerSchema = new Schema<ISharedAnswer>(
	{
		shared_by: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'profs',
		},
		shared_with: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'profs',
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'clients',
		},
		start: {
			type: Date,
			required: false,
		},
		end: {
			type: Date,
			required: false,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: false,
		},
		// Default 100MB, define a capped collection que não cresce infinitamente, mas sim, deleta os dados
		// mais antigos quando o limite é atingido
		capped: {
			size: 1024 * 1024 * 100, // 100MB
		},
	},
)

export default Mongoose.model('shared_answers', SharedAnswerSchema)
