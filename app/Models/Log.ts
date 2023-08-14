import Mongoose, { Schema } from '@ioc:Mongoose'

const LogSchema = new Schema(
	{
		collection: {
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
		prev: {
			type: Object,
			required: true,
		},
		changes: {
			type: Object,
			required: true,
		},
		user: {
			type: {
				value: {
					type: Schema.Types.ObjectId,
					required: true,
				},
				label: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: false,
		},
	},
)

LogSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	next(new Error('This collection is read-only'))
})

export default Mongoose.model('logs', LogSchema)
