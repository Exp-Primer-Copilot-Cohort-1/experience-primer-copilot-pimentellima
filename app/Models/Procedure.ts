import Mongoose, { Schema } from '@ioc:Mongoose'
import { IProcedure } from 'Types/IProcedure'

interface IProcedureModel extends Omit<IProcedure, 'profs' | 'health_insurances'> {
	profs: Schema.Types.ObjectId[]
	health_insurances: {
		info: Schema.Types.ObjectId
		price: number
	}[]
}

const ProcedureSchema = new Schema<IProcedureModel>(
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
		profs: [
			{
				_id: false,
				type: Schema.Types.ObjectId,
				ref: 'profs',
			},
		],
		health_insurances: [
			{
				_id: false,
				info: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'health_insurances',
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
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

ProcedureSchema.index({ unity_id: 1, name: 1, prof: 1, active: 1 }, { unique: false })

ProcedureSchema.index({ unity_id: 1, health_insurance: 1, active: 1 }, { unique: false })

ProcedureSchema.index({ unity_id: 1, minutes: 1, active: 1 }, { unique: false })

export default Mongoose.model<IProcedureModel>('procedures', ProcedureSchema)
