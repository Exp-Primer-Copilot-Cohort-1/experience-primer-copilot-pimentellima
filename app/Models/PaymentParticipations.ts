import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentParticipations } from 'Types/IPaymentProf'

const PaymentParticipations = new Schema<IPaymentParticipations>(
	{
		prices: {
			type: [
				{
					abs: { type: Number, default: 0 },
					percent: { type: Number, default: 0 },
					date_start: { type: Date, default: Date.now },
					date_end: { type: Date },
					active: { type: Boolean, default: true },
				},
			],
			default: [],
		},
		prof: {
			label: { type: String, required: true },
			value: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		},
		procedure: {
			label: { type: String, required: true },
			value: { type: Schema.Types.ObjectId, ref: 'procedures', required: true },
		},
		health_insurance: {
			label: { type: String, required: true },
			value: {
				type: Schema.Types.ObjectId,
				ref: 'health_insurances',
				required: true,
			},
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
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

PaymentParticipations.index(
	{ prof: 1, procedure: 1, health_insurance: 1 },
	{ unique: true },
)

PaymentParticipations.pre('save', function (next) {
	// 'this' se refere ao documento que está sendo salvo
	this.prices.forEach((price) => {
		// verifica se 'active' foi modificado e se é 'false'
		if (price.active === false && price.date_end == null) {
			// seta 'date_end' para a data atual
			price.date_end = new Date()
		}
	})

	// passa para o próximo middleware/handler
	next()
})

PaymentParticipations.pre('save', function (next) {
	if (this.isModified('prices')) {
		this.prices.forEach((price, index) => {
			// se não for o último elemento do array (o novo adicionado), seta 'active' como false
			if (index !== this.prices.length - 1) {
				price.active = false
				// seta 'date_end' para a data atual se ainda não estiver definido
				if (price.date_end == null) {
					price.date_end = new Date()
				}
			}
		})
	}

	next()
})

export default Mongoose.model<IPaymentParticipations>(
	'payment_participations',
	PaymentParticipations,
)
