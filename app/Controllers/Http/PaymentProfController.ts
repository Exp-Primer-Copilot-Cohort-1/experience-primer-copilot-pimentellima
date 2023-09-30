import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreatePaymentParticipationsComposer,
	makeFindAllPaymentParticipationsComposer,
	makeUpdatePaymentParticipationsComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/PaymentParticipations'

/**
 * Controlador para gerenciamento de pagamentos de Profissionais.
 * @swagger
 * tags:
 *  name: Participação de Pagamentos de Profissional
 *  description: Recursos para gerenciamento de participações de pagamentos de profissionais.
 */
class PaymentProfController {
	/**
	 * Retorna todos os pagamentos de Profissionais de acordo com os parâmetros de consulta.
	 * @param ctx O contexto da requisição HTTP.
	 * @returns Uma lista de pagamentos de Profissionais.
	 * @swagger
	 * /payment-participations:
	 *   get:
	 *     summary: Retorna todos os pagamentos de Profissionais de acordo com os parâmetros de consulta.
	 *     tags:
	 *       - Participação de Pagamentos de Profissional
	 *     parameters:
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: integer
	 *         description: Número da página a ser retornada.
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: integer
	 *         description: Número máximo de registros a serem retornados.
	 *     responses:
	 *       200:
	 *         description: Lista de pagamentos de Profissionais.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PaymentProf'
	 */
	async findAllPaymentProfs(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())
		return adaptRoute(makeFindAllPaymentParticipationsComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Cria ou atualiza uma participação do profissional de um procedimento e plano de saúde de profissional.
	 * @param ctx O contexto da requisição HTTP.
	 * @returns O pagamento de profissional criado ou atualizado.
	 * @swagger
	 * /payment-participations:
	 *   post:
	 *     summary: Cria uma participação do profissional de um procedimento e plano de saúde de profissional.
	 *     tags:
	 *       - Participação de Pagamentos de Profissional
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PaymentParticipations'
	 *     responses:
	 *       200:
	 *         description: Pagamento de profissional criado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PaymentProf'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createOrUpdatePaymentProf(ctx: HttpContextContract) {
		return adaptRoute(makeCreatePaymentParticipationsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Atualiza uma participação do profissional de um procedimento e plano de saúde de profissional pelo ID.
	 * @param ctx O contexto da requisição HTTP.
	 * @returns O pagamento de profissional atualizado.
	 * @swagger
	 * /payment-participations/{id}:
	 *   put:
	 *     summary: Atualiza uma participação do profissional de um procedimento e plano de saúde de profissional pelo ID.
	 *     tags:
	 *       - Participação de Pagamentos de Profissional
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/PaymentParticipations'
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: ID do pagamento de profissional a ser atualizado.
	 *     responses:
	 *       200:
	 *         description: Pagamento de profissional atualizado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PaymentProf'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updatePaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdatePaymentParticipationsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default PaymentProfController
