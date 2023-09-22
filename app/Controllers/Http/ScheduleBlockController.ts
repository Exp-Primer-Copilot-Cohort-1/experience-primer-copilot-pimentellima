import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateScheduleBlockComposer,
	makeDeleteScheduleBlockByIdComposer,
	makeFindAllScheduleBlocksComposer,
	makeFindScheduleBlocksByProfIdComposer,
} from 'App/Core/composers/schedule_block/schedule_block-composer'
import { COLLECTION_NAME } from 'App/Models/ScheduleBlock'
import LogDecorator, { ACTION } from '../Decorators/Log'

/**
 * @swagger
 * tags:
 *  name: Bloqueio de Agenda
 *  description: Endpoints para gerenciamento de bloqueio de agenda.
 * /schedule-block:
 *   get:
 *     summary: Retorna todas as datas com bloqueio de agenda.
 *     tags:
 *       - Bloqueio de Agenda
 *     responses:
 *       200:
 *         description: Lista de datas com bloqueio de agenda.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleBlock'
 *   post:
 *     summary: Cria uma data de bloqueio de agenda.
 *     tags:
 *       - Bloqueio de Agenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleBlock'
 *     responses:
 *       201:
 *         description: Bloco de horário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleBlock'
 *   delete:
 *     summary: Deleta um bloco de horário pelo ID.
 *     tags:
 *       - Bloqueio de Agenda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do bloco de horário a ser deletado.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Bloco de horário deletado com sucesso.
 * /schedule-block/{id}:
 *   get:
 *     summary: Retorna todas as datas com bloqueio de agenda de um profissional.
 *     tags:
 *       - Bloqueio de Agenda
 *     responses:
 *       200:
 *         description: Lista de datas com bloqueio de agenda.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduleBlock'
 */
class ScheduleBlockController {
	async findAllScheduleBlocks(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllScheduleBlocksComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findScheduleBlocksByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindScheduleBlocksByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createScheduleBlock(ctx: HttpContextContract) {
		return adaptRoute(makeCreateScheduleBlockComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async deleteScheduleBlockById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteScheduleBlockByIdComposer(), ctx)
	}
}

export default ScheduleBlockController
