import Mongoose, { Schema } from '@ioc:Mongoose'

const LogProcedureSchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('logprocedures', LogProcedureSchema)
