// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import ScheduledConfig from 'App/Models/ScheduledConfig'

import { COLLECTION_NAME } from 'App/Models/User'

/**
 * Controller responsável por atualizar as configurações agendadas.
 */
class ScheduledConfigController {
	/**
	 * Atualiza as configurações agendadas.
	 *
	 * @swagger
	 * tags:
	 *  name: Agenda
	 *  description: Endpoints para gerenciamento de configurações agendadas.
	 * /scheduled-config/{id}:
	 *   put:
	 *     summary: Atualiza as configurações agendadas.
	 *     tags: [Agenda]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do profissional.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ScheduledConfig'
	 *     responses:
	 *       200:
	 *         description: Configuração agendada atualizada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/ScheduledConfig'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       403:
	 *         $ref: '#/components/responses/ForbiddenError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 *       422:
	 *         $ref: '#/components/responses/UnprocessableEntityError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request, bouncer }: HttpContextContract) {
		const data = request.all()

		const scheduled = await ScheduledConfig.findById(params.id).orFail()
		await bouncer.with('ViewScheduledPolicy').authorize('update', scheduled)

		await ScheduledConfig.findByIdAndUpdate(params.id, data).orFail()

		return scheduled
	}
}

export default ScheduledConfigController
