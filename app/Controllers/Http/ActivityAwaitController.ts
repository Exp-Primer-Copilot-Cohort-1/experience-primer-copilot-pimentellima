import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateActivityAwaitComposer,
	makeFindAllActivitiesAwaitComposer,
	makeMarkedActivityAwaitComposer
} from 'App/Core/composers/activities-await/make'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/Activity'


/**
 * @swagger
 * tags:
 *   name: Atividades em Espera
 *   description: Endpoints para gerenciar as atividades em espera (Consultas).
 */

class ActivityAwaitController {

	/**
	 * Retorna todas as atividades aguardando aprovação.
	 * @swagger
	 * /activities/await:
	 *   get:
	 *     summary: Retorna todas as atividades aguardando aprovação.
	 *     tags:
	 *       - Atividades em Espera
	 *     security:
	 *       - jwt: []
	 *     responses:
	 *       200:
	 *         description: Lista de atividades aguardando aprovação.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/ActivityAwait'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesAwaitComposer(ctx), ctx)
	}

	async marked(ctx: HttpContextContract) {
		return adaptRoute(makeMarkedActivityAwaitComposer(ctx), ctx)
	}

	/**
	 * Cria uma nova atividade aguardando aprovação.
	 * @param ctx O contexto HTTP da requisição.
	 * @returns Uma Promise que resolve com a resposta HTTP.
	 * @swagger
	 * /activities/await:
	 *   post:
	 *     summary: Cria uma nova atividade aguardando aprovação.
	 *     tags: [Atividades em Espera]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ActivityAwait'
	 *     responses:
	 *       '200':
	 *         description: Atividade em Espera criada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/ActivityAwait'
	 *       '401':
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       '422':
	 *         $ref: '#/components/responses/UnprocessableEntityError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityAwaitComposer(ctx), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default ActivityAwaitController
