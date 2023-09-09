import Mongoose, { Schema } from '@ioc:Mongoose'

const ReportsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
		date_start: {
			type: String,
			required: true,
		},
		date_end: {
			type: String,
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
		// Default 100MB, define a capped collection que não cresce infinitamente, mas sim, deleta os dados
		// mais antigos quando o limite é atingido
		capped: {
			size: 1024 * 1024 * 100, // 100MB
		},
	},
)

ReportsSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	next(new Error('This collection is read-only'))
})

ReportsSchema.index({ unity_id: 1, date_start: 1, date_end: 1, name: 1 })

export default Mongoose.model('cache_reports', ReportsSchema)
