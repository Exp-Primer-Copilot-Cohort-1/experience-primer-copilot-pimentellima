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
				_id: false,
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
				price_cost: {
					type: Number,
					required: true,
				},
				price_final: {
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

ProcedureSchema.index(
	{ unity_id: 1, name: 1, 'prof.value': 1, active: 1 },
	{ unique: false },
)

ProcedureSchema.index(
	{ unity_id: 1, 'health_insurance.value': 1, active: 1 },
	{ unique: false },
)

ProcedureSchema.index({ unity_id: 1, minutes: 1, active: 1 }, { unique: false })

export default Mongoose.model<IProcedure>('procedures', ProcedureSchema)
