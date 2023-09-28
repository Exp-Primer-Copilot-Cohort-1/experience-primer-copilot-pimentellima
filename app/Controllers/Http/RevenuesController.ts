import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeFindBillingYearByUnityIdComposer,
	makeMinimumBillingByUnityComposer,
	makeUpdateBillingDesirableByUnityComposer,
} from 'App/Core/composers/billing/make'

/**
 * @swagger
 * tags:
 *   name: Faturamentos
 *   description: Endpoints para gerenciamento de faturamentos
 *
 * /revenues:
 *   get:
 *     summary: Retorna os faturamentos do ano atual de uma unidade
 *     tags: [Faturamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de faturamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Revenue'
 * /revenues/minimum:
 *   get:
 *     summary: Atualiza e busca o valor mínimo de faturamento de uma unidade
 *     tags: [Faturamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Faturamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Revenue'
 *
 * /revenues/desirable:
 *   put:
 *     summary: Atualiza o valor desejável de faturamento de uma unidade
 *     tags: [Faturamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Revenue'
 *     responses:
 *       200:
 *         description: Receita atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Revenue'
 * components:
 *   schemas:
 *     Revenue:
 *       type: object
 *       required:
 *         - unity_id
 *         - year
 *         - value
 *       properties:
 *         unity_id:
 *           type: integer
 *           description: ID da unidade
 *         year:
 *           type: integer
 *           description: Ano da receita
 *         value:
 *           type: number
 *           description: Valor da receita
 *       example:
 *         unity_id: 1
 *         year: 2021
 *         value: 100000.00
 */
class RevenuesController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindBillingYearByUnityIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateDesirable(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateBillingDesirableByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateMinimum(ctx: HttpContextContract) {
		return adaptRoute(makeMinimumBillingByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default RevenuesController
