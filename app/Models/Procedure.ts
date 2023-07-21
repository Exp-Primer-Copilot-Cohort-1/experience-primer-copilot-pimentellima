import Mongoose, { Schema } from '@ioc:Mongoose'
import { IProcedure } from 'Types/IProcedure'
import { HealthInsuranceSchemaHelper, ProfSchemaHelper } from './helpers'

const ProcedureSchema = new Schema<IProcedure>(
	{
		active: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		minutes: {
			type: Number,
			required: true,
		},
		prof: [ProfSchemaHelper],
		health_insurance: [HealthInsuranceSchemaHelper],
		products: [
			{
				value: {
					type: Schema.Types.ObjectId,
					required: true,
				},
				label: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IProcedure>('procedures', ProcedureSchema)
