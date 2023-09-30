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
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import FinancialCategory, { COLLECTION_NAME } from 'App/Models/FinancialCategory'

class FinancialCategoryController {
	async index({ auth, request }: HttpContextContract) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())

		const categories = FinancialCategory.find({
			unity_id: userLogged?.unity_id,
			active: opts.active,
		})

		return categories
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store({ request, response, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.only(['name', 'type', 'sub_categories'])
		const categoryData = await FinancialCategory.findOne({ name: data.name })
		if (categoryData && categoryData.active) {
			return response.status(400).send({
				error: {
					message: 'Esta categoria já está cadastrada.',
				},
			})
		}
		const category = await FinancialCategory.create({
			...data,
			active: true,
			unity_id: userLogged?.unity_id,
		})
		return category
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request }: HttpContextContract) {
		const data = request.only(['name', 'type', 'sub_categories', 'active'])

		const category = await FinancialCategory.findByIdAndUpdate(
			params.id,
			data,
		).orFail()

		return { ...category.toObject(), ...data }
	}

	async show({ params }: HttpContextContract) {
		const category = await FinancialCategory.where({ _id: params.id }).orFail()

		return category
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const category = await FinancialCategory.findByIdAndDelete(params.id).orFail()
		await category
	}
}

export default FinancialCategoryController
