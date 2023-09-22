import Mongoose, { Schema } from '@ioc:Mongoose'
import { IHealthInsurance } from 'App/Types/IHealthInsurance'

interface IHealthInsuranceModel extends Omit<IHealthInsurance, 'profs'> {
	profs: Schema.Types.ObjectId[]
}

export const COLLECTION_NAME = 'health_insurances'

/**
 * Esquema do modelo de plano de saúde.
 * @swagger
 * components:
 *   schemas:
 *     HealthInsurance:
 *       type: object
 *       required:
 *         - name
 *         - unity_id
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do plano de saúde.
 *         register_code:
 *           type: string
 *           description: Código de registro do plano de saúde.
 *         carence:
 *           type: number
 *           description: Carência do plano de saúde.
 *         profs:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de profissionais associados ao plano de saúde.
 *         active:
 *           type: boolean
 *           description: Indica se o plano de saúde está ativo ou não.
 *         unity_id:
 *           type: string
 *           description: ID da unidade associada ao plano de saúde.
 *       example:
 *         name: Plano de Saúde A
 *         register_code: ABC123
 *         carence: 30
 *         profs: [ "60a9f9d1c9c3c20015c1d9b9", "60a9f9d1c9c3c20015c1d9ba" ]
 *         active: true
 *         unity_id: 60a9f9d1c9c3c20015c1d9b8
 */
const HealthInsuranceSchema = new Schema<IHealthInsuranceModel>(
	{
		name: { type: String, required: true },
		register_code: { type: String },
		carence: { type: Number },
		profs: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'users',
				_id: false,
			},
		],
		active: { type: Boolean, default: true },
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

HealthInsuranceSchema.index({ unity_id: 1, register_code: 1, name: 1 }, { unique: true })
HealthInsuranceSchema.index({ unity_id: 1, profs: 1, active: 1 }, { unique: false })

export default Mongoose.model<IHealthInsuranceModel>(
	COLLECTION_NAME,
	HealthInsuranceSchema,
)

// enum de como as coleções referências são chamadas na collection de planos de saúde
export enum COLLECTIONS {
	PROFS = 'profs',
	UNITIES = 'unity_id',
}
