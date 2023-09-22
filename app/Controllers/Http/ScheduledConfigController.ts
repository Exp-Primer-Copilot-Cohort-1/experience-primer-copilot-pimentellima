// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ScheduledConfig from 'App/Models/ScheduledConfig'
import { ROLES } from 'App/Roles/types'
import LogDecorator, { ACTION } from '../Decorators/Log'

import { COLLECTION_NAME } from 'App/Models/ScheduledConfig'

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
	public async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()
		const user = await ScheduledConfig.findById(params.id).orFail()
		const isEquals = params.id === userLogged?._id.toString()

		switch (userLogged?.type) {
			case ROLES.PROF:
				if (isEquals) {
					await user.merge(data)
					await user.save()
				}
				break
			case ROLES.SEC:
				if (isEquals) {
					await user.merge(data)
					await user.save()
				}
				break
			default:
				await user.merge(data)
				await user.save()
				break
		}

		return user
	}
}

export default ScheduledConfigController
