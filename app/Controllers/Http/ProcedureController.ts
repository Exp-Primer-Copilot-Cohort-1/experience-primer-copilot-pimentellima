import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeProceduresCountComposer,
	makeProceduresCreateComposer,
	makeProceduresFindAllComposer,
	makeProceduresUpdateByIdComposer
} from 'App/Core/composers/procedures/make'
import { makeProceduresDeleteByIdComposer } from 'App/Core/composers/procedures/make-procedures-delete-by-id-composer'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import { PROJECTION_HEALTH_INSURANCE } from 'App/Core/domain/repositories/helpers/projections'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import Procedure, { COLLECTIONS_REFS, COLLECTION_NAME } from 'App/Models/Procedure'

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
		const opts = getterOptInRequest(ctx)
		return adaptRoute(makeProceduresFindAllComposer(opts), ctx, { unity_id })
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


	/**
	 * Retorna as informações de um procedimento específico de um determinado convênio.
	 * @swagger
	 * /procedures/{id}/{health_insurance_id}:
	 *   get:
	 *     summary: Retorna as informações de um procedimento específico de um determinado convênio.
	 *     description: Retorna as informações de um procedimento específico de um determinado convênio.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do procedimento.
	 *         schema:
	 *           type: string
	 *       - in: path
	 *         name: health_insurance_id
	 *         required: true
	 *         description: ID do convênio.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Retorna as informações do convênio e o valor do procedimento.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 _id:
	 *                   type: string
	 *                   description: ID do convênio.
	 *                 name:
	 *                   type: string
	 *                   description: Nome do convênio.
	 *                 amount:
	 *                   type: number
	 *                   description: Valor do procedimento para o convênio.
	 */
	async showByHealthInsurance({ params, auth }: HttpContextContract) {
		const unity_id = auth.user?.unity_id
		const { id, health_insurance_id } = params

		const procedure = await Procedure.findOne({
			_id: id,
			'health_insurances._id': health_insurance_id,
			unity_id
		})
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_HEALTH_INSURANCE)
			.orFail()
			.exec()

		const doc = procedure.toObject()

		const healthInsurance = {
			...doc.health_insurances[0]._id,
			amount: doc.health_insurances[0].price,
		}

		return healthInsurance
	}

	async getCount(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresCountComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default ProcedureController
