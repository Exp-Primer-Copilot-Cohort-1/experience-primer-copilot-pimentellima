import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPrescription } from 'App/Types/IPrescription'
import { COLLECTION_NAME as COLLECTION_NAME_UNITIES } from './Unity'
import { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'

/**
 * Contract que define as propriedades de uma prescrição.
 */
interface IPrescriptionModel extends Omit<IPrescription, 'prof'> {
	/**
	 * ID do profissional que criou a prescrição.
	 */
	prof: Schema.Types.ObjectId
}

/**
 * Esquema do Mongoose para a coleção de prescrições.
 * @swagger
 * components:
 *   schemas:
 *     Prescription:
 *       type: object
 *       required:
 *         - name
 *         - prof
 *         - text
 *         - unity_id
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da prescrição.
 *           example: "Prescrição de remédios"
 *         prof:
 *           type: string
 *           description: ID do profissional que criou a prescrição.
 *           example: "60f8d9b1d5d9f2001b7e3a4c"
 *         text:
 *           type: string
 *           description: Texto da prescrição.
 *           example: "Tomar um comprimido de 500mg de paracetamol a cada 6 horas."
 *         active:
 *           type: boolean
 *           description: Indica se a prescrição está ativa ou não.
 *           example: true
 *         unity_id:
 *           type: string
 *           description: ID da unidade de saúde onde a prescrição foi criada.
 *           example: "60f8d9b1d5d9f2001b7e3a4c"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da prescrição.
 *           example: "2022-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da prescrição.
 *           example: "2022-01-01T00:00:00.000Z"
 */
const PrescriptionSchema = new Schema<IPrescriptionModel>(
	{
		/**
		 * Nome da prescrição.
		 */
		name: {
			type: String,
			required: true,
		},
		/**
		 * ID do profissional que criou a prescrição.
		 */
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_USER,
		},
		/**
		 * Texto da prescrição.
		 */
		text: {
			type: String,
			required: true,
		},
		/**
		 * Indica se a prescrição está ativa ou não.
		 */
		active: {
			type: Boolean,

			default: true,
		},
		/**
		 * ID da unidade de saúde onde a prescrição foi criada.
		 */
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_UNITIES,
		},
	},
	{
		/**
		 * Define as propriedades de timestamp para o esquema.
		 */
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

/**
 * Define o índice para a coleção de prescrições.
 */
PrescriptionSchema.index({ unity_id: 1, prof: 1 }, { unique: false })

/**
 * Modelo do Mongoose para a coleção de prescrições.
 */
export default Mongoose.model<IPrescriptionModel>('prescriptions', PrescriptionSchema)
