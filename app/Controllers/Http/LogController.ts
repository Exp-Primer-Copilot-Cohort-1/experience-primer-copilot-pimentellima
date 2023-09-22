import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import generateLogModel from 'App/Models/Log'

/**
 * Controlador responsável por gerenciar os logs do sistema.
 * @swagger
 * tags:
 *  name: Logs
 *  description: Recursos relacionados a logs.
 */
class LogController {
	/**
	 * Retorna uma lista de logs de uma unidade específica.
	 *
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista de logs.
	 *
	 * @swagger
	 * /logs:
	 *   get:
	 *     summary: Retorna uma lista de logs de uma unidade específica.
	 *     tags: [Logs]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista de logs.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Log'
	 *       401:
	 *         $ref: '#/components/responses/Unauthorized'
	 */
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id

		if (!unity_id) {
			return ctx.response.status(401).send({ error: 'Unauthorized' })
		}

		const Log = await generateLogModel(unity_id?.toString())

		const logs = await Log.find({ unity_id }).sort({ createdAt: -1 })

		return logs
	}

	/**
	 * Retorna um log específico de uma unidade.
	 *
	 * @param ctx O contexto da requisição.
	 * @returns Um log específico.
	 *
	 * @swagger
	 * /logs/{id}:
	 *   get:
	 *     summary: Retorna um log específico de uma unidade.
	 *     tags: [Logs]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: O ID do log.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Log específico.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Log'
	 *       401:
	 *         $ref: '#/components/responses/Unauthorized'
	 *       404:
	 *         $ref: '#/components/responses/NotFound'
	 */
	async show(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const { id } = ctx.params

		if (!unity_id) {
			return ctx.response.status(401).send({ error: 'Unauthorized' })
		}

		const Log = await generateLogModel(unity_id?.toString())
		const logs = await Log.find({ collection_id: id, unity_id })

		if (!logs) {
			return ctx.response.status(404).send({ error: 'Log not found' })
		}

		return logs
	}
}

export default LogController
