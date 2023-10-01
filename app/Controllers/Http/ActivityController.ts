import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateActivityAwaitComposer,
	makeCreateActivityComposer,
	makeCreateRecurrentActivityComposer,
	makeDeleteActivityByIdComposer,
	makeFindActivitiesByProfIdComposer,
	makeFindActivityByClientIdComposer,
	makeFindActivityByIdComposer,
	makeFindAllActivitiesAwaitComposer,
	makeFindAllActivitiesComposer,
	makeFindAllActivitiesPendingComposer,
	makeFindDayActivitiesComposer,
	makeUpdateActivityByIdComposer,
	makeUpdateActivityFinishedAtComposer,
	makeUpdateActivityStartedAtComposer,
	makeUpdateActivityStatusComposer,
} from 'App/Core/composers/activities/make'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { ROLES } from 'App/Roles/types'

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Endpoints para gerenciar as atividades (Consultas).
 */

/**
 * @swagger
 * tags:
 *   name: Atividades em Espera
 *   description: Endpoints para gerenciar as atividades em espera (Consultas).
 */

/**
 * @swagger
 * tags:
 *   name: Atividades Pendentes
 *   description: Endpoints para gerenciar as atividades pendentes (Consultas).
 */
class ActivityController {
	/**
	 * Retorna todas as atividades de acordo com o tipo de usuário autenticado.
	 *
	 * @swagger
	 * /activities:
	 *   get:
	 *     summary: Retorna todas as atividades de acordo com o tipo de usuário autenticado.
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     responses:
	 *       200:
	 *         description: Lista de atividades.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Activity'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 *
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista de atividades.
	 */
	async findAllActivities(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindActivitiesByProfIdComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof_id: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	async findDayActivities(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindDayActivitiesComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof_id: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindDayActivitiesComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

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
	async findAllActivitiesAwait(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	/**
	 * Retorna todas as atividades pendentes de acordo com o tipo de usuário autenticado.
	 * @swagger
	 * /activities/pending:
	 *   get:
	 *     summary: Retorna todas as atividades pendentes de acordo com o tipo de usuário autenticado.
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades Pendentes
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/ActivityPending'
	 *       401:
	 *         $ref: '#/components/responses/Unauthorized'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	async findAllActivitiesPending(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindAllActivitiesPendingComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesPendingComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	/**
	 * Atualiza o status de uma atividade pelo ID.
	 *
	 * @swagger
	 * /activities/status/{id}:
	 *   put:
	 *     summary: Atualiza o status de uma atividade pelo ID.
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da atividade a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     requestBody:
	 *       description: Objeto contendo o novo status da atividade.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/UpdateActivityStatus'
	 *     responses:
	 *       '204':
	 *         description: Atividade atualizada com sucesso.
	 *       '401':
	 *         $ref: '#/components/responses/Unauthorized'
	 *       '404':
	 *         $ref: '#/components/responses/NotFound'
	 *       '500':
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityStatusById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStatusComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Atualiza a data de início de uma atividade.
	 * @swagger
	 * /activities/started_at/{id}:
	 *   put:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     summary: Atualiza a data de início de uma atividade.
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da atividade a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: Atividade atualizada com sucesso.
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityStartedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStartedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Atualiza a data de finalização de uma atividade.
	 * @swagger
	 * /activities/finished_at/{id}:
	 *   put:
	 *     summary: Atualiza a data de finalização de uma atividade.
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da atividade a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: Atividade atualizada com sucesso.
	 *       401:
	 *         description: Não autorizado.
	 *       404:
	 *         description: Atividade não encontrada.
	 *       500:
	 *         description: Erro interno do servidor.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityFinishedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityFinishedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Retorna as atividades de um profissional pelo seu ID.
	 * @swagger
	 * /activities/prof/{prof_id}:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     summary: Retorna as atividades de um profissional pelo seu ID.
	 *     parameters:
	 *       - in: path
	 *         name: prof_id
	 *         required: true
	 *         description: ID do profissional.
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Activity'
	 *       401:
	 *         description: Não autorizado.
	 *       404:
	 *         description: Não encontrado.
	 *       500:
	 *         description: Erro interno do servidor.
	 * @param ctx O contexto da requisição HTTP.
	 * @returns Uma Promise que resolve com as atividades do profissional.
	 */
	async findActivitiesByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivitiesByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Retorna as atividades de um cliente específico.
	 * @param ctx O contexto HTTP da requisição.
	 * @returns Uma Promise que resolve com as atividades do cliente.
	 * @swagger
	 * /activities/client/{client_id}:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     summary: Retorna as atividades de um cliente específico.
	 *     parameters:
	 *       - in: path
	 *         name: client_id
	 *         required: true
	 *         description: O ID do cliente.
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: As atividades do cliente foram retornadas com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Activity'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 */
	async findActivitiesByClientId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByClientIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Busca uma atividade pelo seu ID.
	 * @param ctx O contexto HTTP da requisição.
	 * @returns Uma Promise que resolve com a resposta HTTP contendo a atividade encontrada ou um erro caso não seja encontrada.
	 *
	 * @swagger
	 * /activities/{id}:
	 *   get:
	 *     security:
	 *       - bearerAuth: []
	 *     tags:
	 *       - Atividades
	 *     summary: Busca uma atividade pelo seu ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: O ID da atividade a ser buscada.
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: A atividade foi encontrada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Activity'
	 *       404:
	 *         description: A atividade não foi encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Erro'
	 */
	async findActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByIdComposer(), ctx)
	}

	/**
	 * Cria uma nova atividade.
	 * @param ctx O contexto HTTP da requisição.
	 * @returns Uma Promise que resolve com a resposta HTTP.
	 *
	 * @swagger
	 * /activities:
	 *   post:
	 *     summary: Cria uma nova atividade.
	 *     tags:
	 *       - Atividades
	 *     security:
	 *       - cookieAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Activity'
	 *     responses:
	 *       '201':
	 *         description: Atividade criada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Activity'
	 *       '401':
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       '422':
	 *         $ref: '#/components/responses/UnprocessableEntityError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
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
	async createActivityAwait(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createRecurrentActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateRecurrentActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Atualiza uma atividade pelo ID.
	 * @param ctx O contexto HTTP da requisição.
	 * @returns Uma Promise que resolve com a resposta HTTP.
	 * @swagger
	 * /activities/{id}:
	 *   put:
	 *     summary: Atualiza uma atividade pelo ID.
	 *     tags:
	 *       - Atividades
	 *       - Atividades em Espera
	 *       - Atividades Pendentes
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: O ID da atividade a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     requestBody:
	 *       description: Os novos dados da atividade.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Activity'
	 *     responses:
	 *       '200':
	 *         description: A atividade foi atualizada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Activity'
	 *       '401':
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       '403':
	 *         $ref: '#/components/responses/ForbiddenError'
	 *       '404':
	 *         $ref: '#/components/responses/NotFoundError'
	 *       '422':
	 *         $ref: '#/components/responses/UnprocessableEntityError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Deleta uma atividade pelo seu ID.
	 *
	 * @swagger
	 * /activities/{id}:
	 *   delete:
	 *     security:
	 *       - bearerAuth: []
	 *     summary: Deleta uma atividade pelo seu ID.
	 *     tags: [Atividades]
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da atividade a ser deletada.
	 *         required: true
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       204:
	 *         description: Atividade deletada com sucesso.
	 *       404:
	 *         description: Atividade não encontrada.
	 *       500:
	 *         description: Erro interno do servidor.
	 *
	 * @param ctx O contexto da requisição HTTP.
	 * @returns Uma Promise que resolve com a resposta HTTP.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async deleteActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityByIdComposer(), ctx)
	}
}

export default ActivityController
