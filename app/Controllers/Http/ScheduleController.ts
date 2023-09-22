import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeGetWorkHoursComposer } from 'App/Core/composers/schedule/schedule-composer'

/**
 * Retorna as horas de trabalho de um profissional.
 * @param ctx O contexto da requisição.
 * @returns As horas de trabalho do profissional.
 *
 * @swagger
 * tags:
 *   name: Horários de Trabalho
 *   description: Endpoints para gerenciamento de horários de trabalho.
 * /schedule/{id}:
 *   get:
 *     tags: [Horários de Trabalho]
 *     summary: Retorna os horários de trabalho de um profissional.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do profissional.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: As horas de trabalho do profissional.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workHours:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       hourStartDay:
 *                         type: string
 *                         description: O horário de início do expediente.
 *                       hourEndDay:
 *                         type: string
 *                         description: O horário de término do expediente.
 *                       hourStartLunch:
 *                         type: string
 *                         description: O horário de início do almoço.
 *                       hourEndLunch:
 *                         type: string
 *                         description: O horário de término do almoço.
 *
 */
/**
 * Controlador responsável por lidar com as requisições relacionadas a horários de trabalho.
 */
class ScheduleController {
	async getWorkHours(ctx: HttpContextContract) {
		return adaptRoute(makeGetWorkHoursComposer(), ctx)
	}
}

export default ScheduleController
