import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCategoriesCreateComposer,
	makeCategoriesDeleteByIdComposer,
	makeCategoriesFindByUnityComposer,
	makeCategoriesShowByIdComposer,
	makeCategoriesUpdateByIdComposer,
	makeCounts,
} from 'App/Core/composers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/Category'

/**
 * Controlador para gerenciamento de categorias.
 * @class
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias.
 */
export class CategoryController {
	/**
	 * Recupera todas as categorias da unidade autenticada.
	 * @param {HttpContextContract} ctx - O contexto HTTP contendo objetos de solicitação e resposta.
	 * @swagger
	 * /categories:
	 *   get:
	 *     summary: Recupera todas as categorias da unidade autenticada.
	 *     tags:
	 *       - Categorias
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Category'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const opts = getterOptInRequest(ctx)
		return adaptRoute(makeCategoriesFindByUnityComposer(opts), ctx, { unity_id })
	}

	/**
	 * Cria uma nova categoria.
	 * @param {HttpContextContract} ctx - O contexto HTTP contendo objetos de solicitação e resposta.
	 * @swagger
	 * /categories:
	 *   post:
	 *     summary: Cria uma nova categoria.
	 *     tags:
	 *       - Categorias
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Category'
	 *     responses:
	 *       201:
	 *         description: Criado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Category'
	 *       400:
	 *         $ref: '#/components/responses/BadRequestError'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Atualiza uma categoria existente pelo ID.
	 * @param {HttpContextContract} ctx - O contexto HTTP contendo objetos de solicitação e resposta.
	 * @swagger
	 * /categories/{id}:
	 *   put:
	 *     summary: Atualiza uma categoria existente pelo ID.
	 *     tags:
	 *       - Categorias
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - $ref: '#/components/parameters/id'
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Category'
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Category'
	 *       400:
	 *         $ref: '#/components/responses/BadRequestError'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesUpdateByIdComposer(), ctx)
	}

	/**
	 * Recupera uma categoria existente pelo ID.
	 * @param {HttpContextContract} ctx - O contexto HTTP contendo objetos de solicitação e resposta.
	 * @swagger
	 * /categories/{id}:
	 *   get:
	 *     summary: Recupera uma categoria existente pelo ID.
	 *     tags:
	 *       - Categorias
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - $ref: '#/components/parameters/id'
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Category'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 */
	async show(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesShowByIdComposer(), ctx)
	}

	/**
	 * Exclui uma categoria existente pelo ID.
	 * @param {HttpContextContract} ctx - O contexto HTTP contendo objetos de solicitação e resposta.
	 * @swagger
	 * /categories/{id}:
	 *   delete:
	 *     summary: Exclui uma categoria existente pelo ID.
	 *     tags:
	 *       - Categorias
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - $ref: '#/components/parameters/id'
	 *     responses:
	 *       204:
	 *         description: Sem conteúdo
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesDeleteByIdComposer(), ctx)
	}

	async counts(ctx: HttpContextContract) {
		const opts = getterOptInRequest(ctx)
		return adaptRoute(makeCounts(opts, COLLECTION_NAME), ctx)
	}
}

export default CategoryController
