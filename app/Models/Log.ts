import Mongoose, { Schema } from '@ioc:Mongoose'
import { COLLECTION_NAME as COLLECTION_NAME_USERS } from './User'

export enum COLLECTION_REF {
	USERS = 'user',
}

/**
 * Representa um registro de log de uma ação realizada por um usuário em uma coleção do banco de dados.
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         collection_name:
 *           type: string
 *           description: O nome da coleção em que a ação foi realizada.
 *         date:
 *           type: string
 *           description: A data em que a ação foi realizada.
 *         collection_id:
 *           type: string
 *           description: O ID da coleção em que a ação foi realizada.
 *         action:
 *           type: string
 *           enum: [post, put, delete]
 *           description: A ação realizada pelo usuário na coleção.
 *         original:
 *           type: object
 *           description: O objeto original antes da ação ser realizada.
 *         modified:
 *           type: object
 *           description: O objeto modificado após a ação ser realizada.
 *         user:
 *           type: string
 *           description: O ID do usuário que realizou a ação.
 *         ip:
 *           type: string
 *           description: O IP do usuário que realizou a ação.
 *         unity_id:
 *           type: string
 *           description: O ID da unidade em que a ação foi realizada.
 *       example:
 *         collection_name: "users"
 *         date: "2021-10-01T14:30:00.000Z"
 *         collection_id: "6166f5f3e7d9f4d7d7a4f8c1"
 *         action: "post"
 *         original: { "name": "John Doe", "email": "johndoe@example.com" }
 *         modified: { "name": "Jane Doe", "email": "janedoe@example.com" }
 *         user: "6166f5f3e7d9f4d7d7a4f8c2"
 *         unity_id: "6166f5f3e7d9f4d7d7a4f8c3"
 */
const LogSchema = new Schema(
	{
		/**
		 * O nome da coleção em que a ação foi realizada.
		 */
		collection_name: {
			type: String,

		},
		/**
		 * A data em que a ação foi realizada.
		 */
		date: {
			type: String,
			required: true,
		},
		/**
		 * O ID da coleção em que a ação foi realizada.
		 */
		collection_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		/**
		 * A ação realizada pelo usuário na coleção.
		 */
		action: {
			type: String,
			required: true,
			enum: ['post', 'put', 'delete'],
		},
		ip: {
			type: String,
		},
		/**
		 * O objeto original antes da ação ser realizada.
		 */
		original: {
			type: Object,
			required: true,
		},
		/**
		 * O objeto modificado após a ação ser realizada.
		 */
		modified: {
			type: Object,
			required: true,
		},
		/**
		 * O ID do usuário que realizou a ação.
		 */
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_USERS
		},
		/**
		 * O ID da unidade em que a ação foi realizada.
		 */
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
	},
	{
		/**
		 * Define os campos de data de criação e atualização do registro.
		 */
		timestamps: {
			createdAt: 'created_at',
			updatedAt: false,
		},
		/**
		 * Define que a coleção tem um tamanho máximo de 256MB e que os dados mais antigos serão deletados quando o limite for atingido.
		 */
		capped: {
			size: 1024 * 1024 * 256, // 256MB
		},
	},
)

LogSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
	next(new Error('This collection is read-only'))
})

LogSchema.index({ collection_id: 1, date: 1 })
LogSchema.index({ user: 1, date: 1 })

const generateCollectionLog = async (unity_id: string) => {
	if (!unity_id) return null

	return Mongoose.model(`logs_${unity_id}`, LogSchema)
}

export default generateCollectionLog
