import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCensusActivitiesByDaysMonthByUnityOrProfComposer,
	makeCensusActivitiesProfByProfComposer,
	makeCensusByMonthByUnityIdComposer,
	makeCensusIdlenessByProfComposer,
	makeCensusPaymentsByFormComposer,
	makeCensusPaymentsByHealthInsuranceComposer,
	makeCensusPaymentsByMonthByUnityIdComposer,
	makeCensusPaymentsByPartnerComposer,
	makeCensusPaymentsByProfComposer,
	makeCensusRevenuesActivitiesComposer,
} from 'App/Core/composers'
import { makeCensusPaymentsParticipationByProfComposer } from 'App/Core/composers/census/make-census-payments-participation-by-prof-composer'
import withControlRoles from './helpers/with-control-roles'

/**
 * Controlador responsável por gerenciar as rotas relacionadas ao censo.
 */
class CensusController {
	/**
	 * Retorna o censo por mês e unidade.
	 * @param ctx O contexto da requisição.
	 * @returns O censo por mês e unidade.
	 */
	async index(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusByMonthByUnityIdComposer)
	}

	/**
	 * Retorna o censo de pagamentos por mês e unidade.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de pagamentos por mês e unidade.
	 */
	async indexPayments(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByMonthByUnityIdComposer)
	}

	/**
	 * Retorna o censo de atividades por profissional e mês.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de atividades por profissional e mês.
	 */
	async indexActivitiesByDaysMonth(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusActivitiesByDaysMonthByUnityOrProfComposer)
	}

	/**
	 * Retorna o censo de pagamentos por forma de pagamento.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de pagamentos por forma de pagamento.
	 */
	async indexPaymentsByForm(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByFormComposer)
	}

	/**
	 * Retorna o censo de atividades por profissional.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de atividades por profissional.
	 */
	async indexActivitiesProfByProf(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusActivitiesProfByProfComposer)
	}

	/**
	 * Retorna o censo de pagamentos por plano de saúde.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de pagamentos por plano de saúde.
	 */
	async indexHealthInsurance(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByHealthInsuranceComposer)
	}

	/**
	 * Retorna o censo de pagamentos por parceiro.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de pagamentos por parceiro.
	 */
	async indexPaymentsByPartner(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByPartnerComposer)
	}

	/**
	 * Retorna o censo de pagamentos por profissional.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de pagamentos por profissional.
	 */
	async indexPaymentsByProf(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByProfComposer)
	}

	/**
	 * Retorna o censo de participação em pagamentos por profissional.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de participação em pagamentos por profissional.
	 */
	async indexPaymentsParticipation(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsParticipationByProfComposer)
	}

	/**
	 * Retorna o censo de receitas por atividades.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de receitas por atividades.
	 */
	async indexRevenuesActivities(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusRevenuesActivitiesComposer)
	}

	/**
	 * Retorna o censo de ociosidade por profissional.
	 * @param ctx O contexto da requisição.
	 * @returns O censo de ociosidade por profissional.
	 */
	async indexIdlenessByProf(ctx: HttpContextContract) {
		return adaptRoute(makeCensusIdlenessByProfComposer(ctx), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

/**
 * @swagger
 * tags:
 *   name: Relatórios
 *   description: Gerenciamento de rotas relacionadas aos relatórios da unidade.
 *
 * /census:
 *   get:
 *     summary: Retorna o relatório por mês e unidade.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório por mês e unidade.
 *
 * /census/payments:
 *   get:
 *     summary: Retorna o relatório de pagamentos por mês e unidade.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de pagamentos por mês e unidade.
 *
 * /census/activities-by-days-month:
 *   get:
 *     summary: Retorna o relatório de atividades por profissional e mês.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de atividades por profissional e mês.
 *
 * /census/payments-by-form:
 *   get:
 *     summary: Retorna o relatório de pagamentos por forma de pagamento.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de pagamentos por forma de pagamento.
 *
 * /census/activities-prof-by-prof:
 *   get:
 *     summary: Retorna o relatório de atividades por profissional.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de atividades por profissional.
 *
 * /census/health-insurance:
 *   get:
 *     summary: Retorna o relatório de pagamentos por plano de saúde.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de pagamentos por plano de saúde.
 *
 * /census/payments-by-partner:
 *   get:
 *     summary: Retorna o relatório de pagamentos por parceiro.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de pagamentos por parceiro.
 *
 * /census/payments-by-prof:
 *   get:
 *     summary: Retorna o relatório de pagamentos por profissional.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de pagamentos por profissional.
 *
 * /census/payments-participation:
 *   get:
 *     summary: Retorna o relatório de participação em pagamentos por profissional.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de participação em pagamentos por profissional.
 *
 * /census/revenues-activities:
 *   get:
 *     summary: Retorna o relatório de receitas por atividades.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de receitas por atividades.
 *
 * /census/idleness-by-prof:
 *   get:
 *     summary: Retorna o relatório de ociosidade por profissional.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: O relatório de ociosidade por profissional.
 */

export default CensusController
