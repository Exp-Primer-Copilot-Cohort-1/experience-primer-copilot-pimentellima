import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeUpdateActivityFinishedAtComposer,
	makeUpdateActivityStartedAtComposer
} from 'App/Core/composers/attendance/make'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/Activity'

class AttendanceController {

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
	async stop(ctx: HttpContextContract) {
		await ctx.bouncer.with('AttendancePolicy').authorize('stop', ctx.params.id)
		return adaptRoute(makeUpdateActivityFinishedAtComposer(), ctx)
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
	async start(ctx: HttpContextContract) {
		await ctx.bouncer.with('AttendancePolicy').authorize('start', ctx.params.id)
		return adaptRoute(makeUpdateActivityStartedAtComposer(), ctx)
	}

}

export default AttendanceController
