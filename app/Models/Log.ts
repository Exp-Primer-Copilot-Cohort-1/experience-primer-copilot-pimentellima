import Mongoose, { Schema } from '@ioc:Mongoose'

const LogSchema = new Schema(
	{
		collection_name: {
			type: String,
			required: false,
		},
		date: {
			type: String,
			required: true,
		},
		collection_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		action: {
			type: String,
			required: true,
			enum: ['post', 'put', 'delete'],
		},
		original: {
			type: Object,
			required: true,
		},
		modified: {
			type: Object,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
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
		// Default 256MB, define a capped collection que não cresce infinitamente, mas sim, deleta os dados
		// mais antigos quando o limite é atingido
		capped: {
			size: 1024 * 1024 * 256, // 256MB
		},
	},
)

LogSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	next(new Error('This collection is read-only'))
})

LogSchema.index({ collection_id: 1, date: 1 })
LogSchema.index({ user: 1, date: 1 })

const generateCollectionLog = async (unity_id: string) => {
	return Mongoose.model(`logs_${unity_id}`, LogSchema)
}

export default generateCollectionLog
