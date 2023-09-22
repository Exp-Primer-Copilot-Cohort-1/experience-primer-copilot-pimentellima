import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makePartnerCreateComposer,
	makePartnerDeleteByIdComposer,
	makePartnerFindByUnityComposer,
	makePartnerUpdateComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { COLLECTION_NAME } from 'App/Models/Partner'
import LogDecorator, { ACTION } from '../Decorators/Log'

/**
 * Controller responsible for handling Partner-related HTTP requests.
 * @swagger
 * tags:
 *  name: Parceiros
 *  description: Recursos para gerenciamento de parceiros.
 */
class PartnerController {
	/**
	 * Retrieves a list of partners based on the query parameters.
	 *
	 * @param ctx The HTTP context containing the request and response objects.
	 * @returns A response containing the list of partners.
	 *
	 * @swagger
	 * /partners:
	 *   get:
	 *     summary: Retorna uma lista de parceiros.
	 *     tags:
	 *       - Parceiros
	 *     responses:
	 *       200:
	 *         description: Lista de parceiros.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Partner'
	 */
	async index(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())

		return adaptRoute(makePartnerFindByUnityComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Creates a new partner based on the request body.
	 *
	 * @param ctx The HTTP context containing the request and response objects.
	 * @returns A response containing the newly created partner.
	 *
	 * @swagger
	 * /partners:
	 *   post:
	 *     summary: Cria um novo parceiro.
	 *     tags:
	 *       - Parceiros
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Partner'
	 *     responses:
	 *       201:
	 *         description: Parceiro criado com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Partner'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		return adaptRoute(makePartnerCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Updates an existing partner based on the request body.
	 *
	 * @param ctx The HTTP context containing the request and response objects.
	 * @returns A response containing the updated partner.
	 *
	 * @swagger
	 * /partners/{id}:
	 *   put:
	 *     summary: Atualiza um parceiro existente.
	 *     tags:
	 *       - Parceiros
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: O ID do parceiro.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Partner'
	 *     responses:
	 *       200:
	 *         description: Parceiro atualizado com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Partner'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makePartnerUpdateComposer(), ctx)
	}

	/**
	 * Deletes an existing partner based on its ID.
	 *
	 * @param ctx The HTTP context containing the request and response objects.
	 * @returns A response indicating whether the deletion was successful.
	 *
	 * @swagger
	 * /partners/{id}:
	 *   delete:
	 *     summary: Deleta um parceiro existente.
	 *     tags:
	 *       - Parceiros
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: O ID do parceiro.
	 *     responses:
	 *       204:
	 *         description: Parceiro deletado com sucesso.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makePartnerDeleteByIdComposer(), ctx)
	}
}

export default PartnerController
