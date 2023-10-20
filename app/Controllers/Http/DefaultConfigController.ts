import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeDefaultConfigsCreateComposer,
	makeDefaultConfigsShowByUnityComposer,
	makeDefaultConfigsUpdateByIdComposer,
} from 'App/Core/composers'

/**
 * Controlador para as configurações padrão.
 */
class DefaultConfigController {


	/**
	 * Cria uma nova configuração padrão para uma unidade.
	 * @param ctx O contexto da requisição.
	 * @returns A nova configuração padrão criada.
	 */
	async store(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsCreateComposer(ctx), ctx)
	}

	/**
	 * Atualiza uma configuração padrão existente.
	 * @param ctx O contexto da requisição.
	 * @returns A configuração padrão atualizada.
	 */
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsUpdateByIdComposer(ctx), ctx)
	}

	/**
	 * Retorna as configurações padrão de uma unidade.
	 * @param ctx O contexto da requisição.
	 * @returns As configurações padrão da unidade.
	 */
	async show(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsShowByUnityComposer(ctx), ctx)
	}


}

/**
 * @swagger
 * tags:
 *   name: Configurações Padrão
 *   description: Operações relacionadas às configurações padrão.
 *
 * /default-config:
 *   get:
 *     summary: Retorna as configurações padrão de uma unidade.
 *     tags: [Configurações Padrão]
 *     responses:
 *       200:
 *         description: As configurações padrão da unidade.
 *   post:
 *     summary: Cria uma nova configuração padrão para uma unidade.
 *     tags: [Configurações Padrão]
 *     responses:
 *       200:
 *         description: A nova configuração padrão criada.
 *   put:
 *     summary: Atualiza uma configuração padrão existente.
 *     tags: [Configurações Padrão]
 *     responses:
 *       200:
 *         description: A configuração padrão atualizada.
 */

export default DefaultConfigController
