import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeProceduresCreateComposer } from 'App/Core/composers'
import { makeProceduresUpdateByIdComposer } from 'App/Core/composers/procedures'
import { makeProceduresDeleteByIdComposer } from 'App/Core/composers/procedures/make-procedures-delete-by-id-composer'
import { makeProceduresFindAllComposer } from 'App/Core/composers/procedures/make-procedures-find-all-composer'
import Procedure, { COLLECTION_NAME } from 'App/Models/Procedure'
import LogDecorator, { ACTION } from '../Decorators/Log'

/**
 * Controlador responsável por gerenciar as rotas relacionadas a procedimentos.
 * @swagger
 * tags:
 *  name: Procedimentos
 *  description: Recursos para gerenciamento de procedimentos.
 */
class ProcedureController {
	/**
	 * Retorna uma lista de todos os procedimentos disponíveis na unidade do usuário autenticado.
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista de procedimentos.
	 * @swagger
	 * /procedures:
	 *   get:
	 *     summary: Retorna uma lista de todos os procedimentos disponíveis na unidade do usuário autenticado.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista de procedimentos.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Procedure'
	 */
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id

		return adaptRoute(makeProceduresFindAllComposer(), ctx, { unity_id })
	}

	/**
	 * Cria um novo procedimento.
	 * @param ctx O contexto da requisição.
	 * @returns O procedimento criado.
	 * @swagger
	 * /procedures:
	 *   post:
	 *     summary: Cria um novo procedimento.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Procedure'
	 *     responses:
	 *       201:
	 *         description: Procedimento criado com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Procedure'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeProceduresCreateComposer(), ctx, { unity_id })
	}

	/**
	 * Atualiza um procedimento existente.
	 * @param ctx O contexto da requisição.
	 * @returns O procedimento atualizado.
	 * @swagger
	 * /procedures/{id}:
	 *   put:
	 *     summary: Atualiza um procedimento existente.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do procedimento a ser atualizado.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Procedure'
	 *     responses:
	 *       200:
	 *         description: Procedimento atualizado com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Procedure'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresUpdateByIdComposer(), ctx)
	}

	/**
	 * Remove um procedimento existente.
	 * @param ctx O contexto da requisição.
	 * @returns Uma mensagem de sucesso.
	 * @swagger
	 * /procedures/{id}:
	 *   delete:
	 *     summary: Remove um procedimento existente.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do procedimento a ser removido.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Procedimento removido com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresDeleteByIdComposer(), ctx)
	}

	/**
	 * Adiciona um produto a um procedimento existente.
	 * @param ctx O contexto da requisição.
	 * @returns Uma mensagem de sucesso.
	 * @swagger
	 * /procedures/{id}/products:
	 *   put:
	 *     summary: Adiciona um produto a um procedimento existente.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do procedimento ao qual o produto será adicionado.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ProductInput'
	 *     responses:
	 *       200:
	 *         description: Produto adicionado com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async addProduct(ctx: HttpContextContract) {
		await Procedure.findByIdAndUpdate(ctx.params.id, {
			$push: {
				products: ctx.request.body(),
			},
		})
		return ctx.response.ok({ message: 'Produto adicionado com sucesso' })
	}

	/**
	 * Remove um produto de um procedimento existente.
	 * @param ctx O contexto da requisição.
	 * @returns Uma mensagem de sucesso.
	 * @swagger
	 * /procedures/{id}/products:
	 *   delete:
	 *     summary: Remove um produto de um procedimento existente.
	 *     tags: [Procedimentos]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do procedimento do qual o produto será removido.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ProductInput'
	 *     responses:
	 *       200:
	 *         description: Produto removido com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async removeProduct(ctx: HttpContextContract) {
		await Procedure.findByIdAndUpdate(ctx.params.id, {
			$pull: {
				products: ctx.request.body(),
			},
		})
		return ctx.response.ok({ message: 'Produto removido com sucesso' })
	}
}

export default ProcedureController
