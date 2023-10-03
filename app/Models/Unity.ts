import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import { IPhone, IUnity } from 'App/Types/IUnity'
import { HolidaySchemaHelper } from './helpers/Holiday'

import { COLLECTION_NAME as COLLECTION_NAME_FRANCHISES } from './BusinessFranchises'

export const COLLECTION_NAME = 'unities'

/**
 * Esquema do Mongoose para a entidade Unidade.
 * @swagger
 * components:
 *   schemas:
 *     Unity:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: E-mail da unidade.
 *         active:
 *           type: boolean
 *           description: Indica se a unidade está ativa ou não.
 *         address:
 *           type: string
 *           description: Endereço da unidade.
 *         address_number:
 *           type: string
 *           description: Número do endereço da unidade.
 *         avatar:
 *           type: string
 *           description: URL do avatar da unidade.
 *         city:
 *           type: string
 *           description: Cidade da unidade.
 *         cep:
 *           type: string
 *           description: CEP da unidade.
 *         cnaes:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de CNAEs da unidade.
 *         complement:
 *           type: string
 *           description: Complemento do endereço da unidade.
 *         country:
 *           type: string
 *           description: País da unidade.
 *         date_expiration:
 *           type: string
 *           format: date-time
 *           description: Data de expiração da unidade.
 *         document:
 *           type: string
 *           description: Documento da unidade.
 *         is_company:
 *           type: boolean
 *           description: Indica se a unidade é uma empresa ou não.
 *         name_company:
 *           type: string
 *           description: Nome da empresa da unidade.
 *         neighborhood:
 *           type: string
 *           description: Bairro da unidade.
 *         obs:
 *           type: string
 *           description: Observações sobre a unidade.
 *         phones:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Phone'
 *           description: Lista de telefones da unidade.
 *         site:
 *           type: string
 *           description: Site da unidade.
 *         state:
 *           type: string
 *           description: Estado da unidade.
 *         revenue_reports:
 *           type: object
 *           description: Relatórios de receita da unidade.
 *         holidays:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Holiday'
 *           description: Lista de feriados da unidade.
 *       required:
 *         - email
 *         - active
 *         - date_expiration
 *         - document
 *         - is_company
 *       example:
 *         email: unidade1@example.com
 *         active: true
 *         address: Rua A
 *         address_number: 123
 *         avatar: https://example.com/avatar.png
 *         city: São Paulo
 *         cep: 12345-678
 *         cnaes: [1234-5/01, 1234-5/02]
 *         complement: Apto 123
 *         country: Brasil
 *         date_expiration: '2022-12-31T23:59:59.999Z'
 *         document: 123.456.789-00
 *         is_company: false
 *         name_company: Empresa 1
 *         neighborhood: Bairro A
 *         obs: Observações sobre a unidade
 *         phones:
 *           - number: (11) 1234-5678
 *             type: Comercial
 *           - number: (11) 9876-5432
 *             type: Celular
 *         site: https://example.com
 *         state: SP
 *         revenue_reports:
 *           2021:
 *             1: 1000.0
 *             2: 2000.0
 *             3: 3000.0
 *             4: 4000.0
 *             5: 5000.0
 *             6: 6000.0
 *             7: 7000.0
 *             8: 8000.0
 *             9: 9000.0
 *             10: 10000.0
 *             11: 11000.0
 *             12: 12000.0
 *         holidays:
 *           - date: '2022-01-01'
 *             name: Ano Novo
 *           - date: '2022-04-21'
 *             name: Tiradentes
 *           - date: '2022-05-01'
 *             name: Dia do Trabalho
 *           - date: '2022-09-07'
 *             name: Independência do Brasil
 *           - date: '2022-10-12'
 *             name: Nossa Senhora Aparecida
 *           - date: '2022-11-02'
 *             name: Finados
 *           - date: '2022-11-15'
 *             name: Proclamação da República
 *           - date: '2022-12-25'
 *             name: Natal
 */
export const UnitySchema = new Schema<IUnity>(
	{
		name: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			immutable: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
		street: {
			type: String,

		},
		address_number: {
			type: String,

		},
		avatar: {
			type: String,

		},
		city: {
			type: String,

		},
		cep: {
			type: String,

		},
		cnaes: {
			type: String,
		},
		complement: {
			type: String,

		},
		country: {
			type: String,
		},
		date_expiration: {
			type: Date,
			required: true,
		},
		document: {
			type: String,
			required: true,
			unique: true,
			immutable: true,
		},
		is_company: {
			type: Boolean,
			required: true,
		},
		neighborhood: {
			type: String,

		},
		obs: {
			type: String,

		},
		phones: new Mongoose.SchemaTypeOptions<IPhone[]>(),
		site: {
			type: String,

		},
		state: {
			type: String,

		},
		revenue_reports: {
			type: Map<string, {
				desirable: number[],
				expected: number[],
				current: number[],
			}>,
		},
		holidays: {
			type: [HolidaySchemaHelper],
		},
		created_by: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: COLLECTION_NAME,
		},
		franchised: {
			type: Boolean,
			default: false,
		},
		franchise: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: COLLECTION_NAME_FRANCHISES
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

UnitySchema.index(
	{
		country: 1,
		state: 1,
		city: 1,
		neighborhood: 1,
		address: 1,
		address_number: 1,
	},
	{ unique: false },
)

UnitySchema.pre('save', async function (next) {
	if (this.isNew) {
		this.document =
			this.document && (await encrypt(this.document?.replace(/\D/g, '')))
		this.cnaes = this.cnaes && (await encrypt(this.cnaes))
	}

	next()
})

UnitySchema.post('find', async function (docs) {
	for (const doc of docs) {
		try {
			if (doc?.document) {
				doc.document = await decrypt(doc.document)
			}

			if (doc?.cnaes) {
				doc.cnaes = await decrypt(doc.cnaes)
			}
		} catch (error) {

		}
	}
})

UnitySchema.post('findOne', async function (doc) {
	try {
		if (doc?.document) {
			doc.document = await decrypt(doc.document)
		}

		if (doc?.cnaes) {
			doc.cnaes = await decrypt(doc.cnaes)
		}
	} catch (error) {

	}
})


export default Mongoose.model<IUnity>(COLLECTION_NAME, UnitySchema)
