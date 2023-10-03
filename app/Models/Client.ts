import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IUserClient } from 'App/Types/IClient'
interface IUserClientModel extends Omit<IUserClient, 'prof'> {
	partners: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'clients'

export enum COLLECTIONS_REFS {
	PARTNERS = 'partner',
	UNITIES = 'unity_id',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do cliente.
 *         form_answers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               form:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do formulário.
 *                   name:
 *                     type: string
 *                     description: Nome do formulário.
 *               activity_id:
 *                 type: string
 *                 description: ID da atividade.
 *               field_answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: Pergunta do formulário.
 *                     answer:
 *                       type: string
 *                       description: Resposta do formulário.
 *           description: Respostas do formulário.
 *         avatar:
 *           type: string
 *           description: URL da imagem do avatar do cliente.
 *         birth_date:
 *           type: string
 *           description: Data de nascimento do cliente.
 *         gender:
 *           type: string
 *           description: Gênero do cliente.
 *         document:
 *           type: string
 *           description: Documento do cliente.
 *         rg:
 *           type: string
 *           description: RG do cliente.
 *         celphone:
 *           type: string
 *           description: Número de celular do cliente.
 *         phone:
 *           type: string
 *           description: Número de telefone do cliente.
 *         naturalness:
 *           type: string
 *           description: Naturalidade do cliente.
 *         nationality:
 *           type: string
 *           description: Nacionalidade do cliente.
 *         profession:
 *           type: string
 *           description: Profissão do cliente.
 *         observation:
 *           type: string
 *           description: Observação sobre o cliente.
 *         sms_checked:
 *           type: boolean
 *           description: Indica se o cliente gostaria de ser notificado por sms.
 *         mail_checked:
 *           type: boolean
 *           description: Indica se o cliente gostaria de ser notificado por email.
 *         email:
 *           type: string
 *           description: E-mail do cliente.
 *         unity_id:
 *           type: string
 *           description: ID da unidade.
 *         active:
 *           type: boolean
 *           description: Indica se o cliente está ativo.
 *         partner:
 *           type: string
 *           description: ID do parceiro.
 *         due_date:
 *           type: string
 *           description: Data de vencimento.
 *         underaged:
 *           type: boolean
 *           description: Indica se o cliente é menor de idade.
 *           default: false
 *         sponsor:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nome do responsável.
 *             phone:
 *               type: string
 *               description: Telefone do responsável.
 *         cep:
 *           type: string
 *           description: CEP do cliente.
 *         street:
 *           type: string
 *           description: Rua do cliente.
 *         address_number:
 *           type: string
 *           description: Número do endereço do cliente.
 *         complement:
 *           type: string
 *           description: Complemento do endereço do cliente.
 *         neighborhood:
 *           type: string
 *           description: Bairro do cliente.
 *         city:
 *           type: string
 *           description: Cidade do cliente.
 *         state:
 *           type: string
 *           description: Estado do cliente.
 *         country:
 *           type: string
 *           description: País do cliente.
 *       required:
 *         - name
 *         - celphone
 *         - birth_date
 *         - unity_id
 */
const ClientSchema = new Schema<IUserClient>(
	{
		name: {
			type: String,
			required: true,
		},
		social_name: {
			type: String,
			required: false,
		},
		form_answers: [
			{
				form: {
					id: { type: Mongoose.Types.ObjectId, required: true },
					name: { type: String, required: true },
					_id: false,
				},
				prof: {
					value: { type: String, required: true },
					label: { type: String, required: true },
					_id: false,
				},
				profs_with_access: [
					{
						id: {
							type: String,
							required: true,
						},
						name: {
							type: String,
							required: true,
						},
						start: { type: Date },
						end: { type: Date },
						_id: false,
					},
				],
				activity_id: { type: Mongoose.Types.ObjectId, required: true },
				field_answers: [
					{
						question: {
							type: String,
							required: true,
						},
						answer: {
							type: String,
							required: true,
						},
					},
				],
			},
		],
		avatar: {
			type: String,
		},
		birth_date: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			default: 'not_informed',
		},
		document: {
			type: String,
		},
		rg: {
			type: String,
		},
		celphone: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		naturalness: {
			type: String,
		},
		nationality: {
			type: String,
		},
		profession: {
			type: String,
		},
		observation: {
			type: String,
		},
		sms_checked: {
			type: Boolean,
			default: false,
		},
		mail_checked: {
			type: Boolean,
			default: false,
		},
		email: {
			type: String,
			default: '',
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		partner: {
			type: Schema.Types.ObjectId,
			required: false,
			default: null,
			ref: 'partners',
		},
		due_date: {
			type: Date,
		},
		cep: {
			type: String,
		},
		street: {
			type: String,
		},
		address_number: {
			type: String,
		},
		complement: {
			type: String,
		},
		neighborhood: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
		underaged: {
			type: Boolean,
			default: false,
		},
		sponsor: {
			name: {
				type: String,
				required: function () {
					return this.underaged === true;
				},
			},
			phone: {
				type: String,
				required: function () {
					return this.underaged === true;
				},
			},
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ClientSchema.pre('save', async function (next) {
	if (this.isNew) {
		this.document =
			this.document && (await encrypt(this.document?.replace(/\D/g, '')))
		this.rg = this.rg && (await encrypt(this.rg?.replace(/\D/g, '')))
	}

	next()
})

ClientSchema.post('find', async function (docs) {
	for (const doc of docs) {
		try {
			if (doc?.document) {
				doc.document = await decrypt(doc.document)
			}

			if (doc?.rg) {
				doc.rg = await decrypt(doc.rg)
			}
		} catch (error) {

		}
	}
})

ClientSchema.post('findOne', async function (doc) {
	try {
		if (doc?.document) {
			doc.document = await decrypt(doc.document)
		}

		if (doc?.rg) {
			doc.rg = await decrypt(doc.rg)
		}
	} catch (error) {

	}
})

ClientSchema.index(
	{ unity_id: 1, name: 1, celphone: 1, email: 1, birth_date: 1 },
	{
		unique: true,
		partialFilterExpression: {
			$or: [
				{ celphone: { $exists: true } },
				{ email: { $exists: true } },
			],
		},
	}
)

ClientSchema.index(
	{
		rg: 1,
		unity_id: 1,
		document: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			$or: [
				{ rg: { $exists: true } },
				{ document: { $exists: true } },
			],
		},
	}
);


// enum de como as coleções referências são chamadas na collection de clientes

export default Mongoose.model<IUserClientModel>(COLLECTION_NAME, ClientSchema)
