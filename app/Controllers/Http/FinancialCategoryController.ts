
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCounts, makeFinancialCategoryCreateComposer, makeFinancialCategoryFindByIdComposer, makeFinancialCategoryUpdateComposer, makeFindAll } from 'App/Core/composers'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import FinancialCategory, { COLLECTION_NAME } from 'App/Models/FinancialCategory'

// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
/**
 * @swagger
 * tags:
 *   name: Categoria Financeira
 *   description: Controlador de categorias financeiras
 *
 * /financial-categories:
 *   get:
 *     summary: Retorna todas as categorias financeiras ativas do usuário logado
 *     tags: [Categoria Financeira]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias financeiras ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FinancialCategory'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Cria uma nova categoria financeira
 *     tags: [Categoria Financeira]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FinancialCategory'
 *     responses:
 *       201:
 *         description: Categoria financeira criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialCategory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   put:
 *     summary: Atualiza uma categoria financeira existente
 *     tags: [Categoria Financeira]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria financeira a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FinancialCategory'
 *     responses:
 *       200:
 *         description: Categoria financeira atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialCategory'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Remove uma categoria financeira existente
 *     tags: [Categoria Financeira]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria financeira a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria financeira removida com sucesso
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 * /financial-categories/inatives:
 *   get:
 *     summary: Retorna todas as categorias financeiras inativas do usuário logado
 *     tags: [Categoria Financeira]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias financeiras inativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FinancialCategory'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
class FinancialCategoryController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAll(ctx, COLLECTION_NAME), ctx)
	}

	async store(ctx: HttpContextContract) {
		return adaptRoute(makeFinancialCategoryCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeFinancialCategoryUpdateComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeFinancialCategoryFindByIdComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const category = await FinancialCategory.findByIdAndDelete(params.id).orFail()
		await category
	}

	async counts(ctx: HttpContextContract) {
		return adaptRoute(makeCounts(ctx, COLLECTION_NAME), ctx)
	}
}

export default FinancialCategoryController
