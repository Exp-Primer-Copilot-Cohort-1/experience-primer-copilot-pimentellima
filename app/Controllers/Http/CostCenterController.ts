import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import CostCenter, { COLLECTION_NAME } from 'App/Models/CostCenter'

/**
 * @swagger
 * tags:
 *   name: Centros de Custo
 *   description: Endpoints para gerenciar os centros de custo
 */

class CostCenterController {
	/**
	 * @swagger
	 * /cost-centers:
	 *   get:
	 *     summary: Lista todos os centros de custo ativos da unidade do usuário logado
	 *     tags: [Centros de Custo]
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Lista de centros de custo
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/CostCenter'
	 */
	async index({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const costCenters = await CostCenter.find({
			unity_id: userLogged?.unity_id,
			active: true,
		})

		return costCenters
	}

	/**
	 * @swagger
	 * /cost-centers:
	 *   post:
	 *     summary: Cria um novo centro de custo
	 *     tags: [Centros de Custo]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *                 description: Nome do centro de custo
	 *             required:
	 *               - name
	 *     responses:
	 *       200:
	 *         description: Centro de custo criado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CostCenter'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.only(['name'])
		const costCenters = await CostCenter.create({
			...data,
			active: true,
			unity_id: userLogged?.unity_id,
		})
		return costCenters
	}

	/**
	 * @swagger
	 * /cost-centers/{id}:
	 *   put:
	 *     summary: Atualiza um centro de custo existente
	 *     tags: [Centros de Custo]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do centro de custo a ser atualizado
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *                 description: Novo nome do centro de custo
	 *               active:
	 *                 type: boolean
	 *                 description: Indica se o centro de custo está ativo ou não
	 *             required:
	 *               - name
	 *     responses:
	 *       200:
	 *         description: Centro de custo atualizado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CostCenter'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request }: HttpContextContract) {
		const data = request.only(['name', 'active'])
		const costCenters = await CostCenter.findByIdAndUpdate(params.id, data).orFail()

		return { ...costCenters.toObject(), ...data }
	}

	/**
	 * @swagger
	 * /cost-centers/{id}:
	 *   get:
	 *     summary: Retorna um centro de custo pelo ID
	 *     tags: [Centros de Custo]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do centro de custo a ser retornado
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Centro de custo encontrado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CostCenter'
	 */
	async show({ params }: HttpContextContract) {
		const costCenters = await CostCenter.findById(params.id).orFail()

		return costCenters
	}

	/**
	 * @swagger
	 * /cost-centers/{id}:
	 *   delete:
	 *     summary: Deleta um centro de custo pelo ID
	 *     tags: [Centros de Custo]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID do centro de custo a ser deletado
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Centro de custo deletado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/CostCenter'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const costCenters = await CostCenter.findByIdAndDelete(params.id).orFail()
		return costCenters
	}
}

export default CostCenterController
