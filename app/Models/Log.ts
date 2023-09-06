import Mongoose, { Schema } from '@ioc:Mongoose'

const LogSchema = new Schema(
	{
		collection_name: {
			type: String,
			required: true,
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
		before: {
			type: Object,
			required: true,
		},
		after: {
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
				_id: false,
			},
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
	},
)

LogSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	next(new Error('This collection is read-only'))
})

LogSchema.index({ unity_id: 1, collection_id: 1 })

export default Mongoose.model('logs', LogSchema)
