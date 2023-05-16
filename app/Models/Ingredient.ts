import Mongoose, { Schema } from '@ioc:Mongoose'

const IgredientSchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('', IgredientSchema)
