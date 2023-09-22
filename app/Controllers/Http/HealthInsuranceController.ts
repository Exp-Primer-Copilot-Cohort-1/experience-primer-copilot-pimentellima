import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeHealthInsuranceCreateComposer,
	makeHealthInsuranceFindAllByUnityIdComposer,
	makeHealthInsuranceFindByIdComposer,
	makeHealthInsuranceUpdateComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import HealthInsurance, { COLLECTION_NAME } from 'App/Models/HealthInsurance'
import LogDecorator, { ACTION } from '../Decorators/Log'

/**
 * Controlador para as rotas relacionadas a planos de saúde.
 * @swagger
 * tags:
 *   name: Planos de Saúde
 *   description: Recursos relacionados à planos de saúde.
 */
class HealthInsuranceController {
	/**
	 * Retorna uma lista paginada de planos de saúde associados à unidade do usuário autenticado.
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista paginada de planos de saúde.
	 * @swagger
	 * /health-insurances:
	 *   get:
	 *     summary: Retorna uma lista paginada de planos de saúde associados à unidade do usuário autenticado.
	 *     tags: [Planos de Saúde]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista paginada de planos de saúde.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/HealthInsurance'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const opts = OptsQuery.build(ctx.request.qs())

		return adaptRoute(makeHealthInsuranceFindAllByUnityIdComposer(opts), ctx, {
			unity_id,
		})
	}

	/**
	 * Retorna um plano de saúde pelo seu ID.
	 * @param ctx O contexto da requisição.
	 * @returns O plano de saúde encontrado.
	 * @swagger
	 * /health-insurances/{id}:
	 *   get:
	 *     summary: Retorna um plano de saúde pelo seu ID.
	 *     tags: [Planos de Saúde]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: O ID do plano de saúde.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Plano de saúde encontrado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/HealthInsurance'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	async show(ctx: HttpContextContract) {
		return adaptRoute(makeHealthInsuranceFindByIdComposer(), ctx)
	}

	/**
	 * Cria um novo plano de saúde.
	 * @param ctx O contexto da requisição.
	 * @returns O plano de saúde criado.
	 * @swagger
	 * /health-insurances:
	 *   post:
	 *     summary: Cria um novo plano de saúde.
	 *     tags: [Planos de Saúde]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/HealthInsurance'
	 *     responses:
	 *       201:
	 *         description: Plano de saúde criado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/HealthInsurance'
	 *       400:
	 *         $ref: '#/components/responses/BadRequestError'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id?.toString()
		return adaptRoute(makeHealthInsuranceCreateComposer(), ctx, {
			unity_id,
		})
	}

	/**
	 * Atualiza um plano de saúde existente.
	 * @param ctx O contexto da requisição.
	 * @returns O plano de saúde atualizado.
	 * @swagger
	 * /health-insurances/{id}:
	 *   put:
	 *     summary: Atualiza um plano de saúde existente.
	 *     tags: [Planos de Saúde]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: O ID do plano de saúde.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/HealthInsuranceUpdate'
	 *     responses:
	 *       200:
	 *         description: Plano de saúde atualizado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/HealthInsurance'
	 *       400:
	 *         $ref: '#/components/responses/BadRequestError'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeHealthInsuranceUpdateComposer(), ctx)
	}

	/**
	 * Exclui um plano de saúde existente.
	 * @param params Os parâmetros da requisição.
	 * @returns O plano de saúde excluído.
	 * @swagger
	 * /health-insurances/{id}:
	 *   delete:
	 *     summary: Exclui um plano de saúde existente.
	 *     tags: [Planos de Saúde]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: O ID do plano de saúde.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Plano de saúde excluído.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/HealthInsurance'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 *       404:
	 *         $ref: '#/components/responses/NotFoundError'
	 *       500:
	 *         $ref: '#/components/responses/InternalServerError'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const healthInsurances = await HealthInsurance.findByIdAndDelete(params.id)
		return healthInsurances
	}
}

export default HealthInsuranceController
