import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeHolidaysAddByUnityComposer,
	makeHolidaysFindAllByUnityIdComposer,
	makeHolidaysRemoveByUnityComposer,
} from 'App/Core/composers/holidays/make'

/**
 * Controlador responsável por lidar com as requisições relacionadas a feriados.
 * @swagger
 * tags:
 *  name: Feriados
 *  description: Recursos relacionados a feriados.
 */
class HolidaysController {
	/**
	 * Retorna todos os feriados de uma unidade.
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista com todos os feriados da unidade.
	 * @swagger
	 * /holidays:
	 *   get:
	 *     summary: Retorna todos os feriados de uma unidade.
	 *     tags: [Feriados]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista com todos os feriados da unidade.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Holiday'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeHolidaysFindAllByUnityIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Adiciona um novo feriado à unidade.
	 * @param ctx O contexto da requisição.
	 * @returns O feriado adicionado.
	 * @swagger
	 * /holidays:
	 *   post:
	 *     summary: Adiciona um novo feriado à unidade.
	 *     tags: [Feriados]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Holiday'
	 *     responses:
	 *       200:
	 *         description: O feriado adicionado.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Holiday'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	async store(ctx: HttpContextContract) {
		return adaptRoute(makeHolidaysAddByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	/**
	 * Remove um feriado da unidade.
	 * @param ctx O contexto da requisição.
	 * @returns O feriado removido.
	 * @swagger
	 * /holidays:
	 *   delete:
	 *     summary: Remove um feriado da unidade.
	 *     tags: [Feriados]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Holiday'
	 *     responses:
	 *       200:
	 *         description: O feriado removido.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Holiday'
	 *       401:
	 *         $ref: '#/components/responses/UnauthorizedError'
	 */
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeHolidaysRemoveByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default HolidaysController
