import { adaptRoute } from 'App/Core/adapters'
import { makeFindAllPrescriptionsComposer, makePrescriptionsCreateComposer, makePrescriptionsFindByIdComposer, makePrescriptionsUpdateComposer, makePrescriptionsUpdateStatusComposer } from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import Prescription from 'App/Models/Prescription'
import { HttpContextContract } from 'App/Types/Adonis'
import { z } from 'zod'

const prescriptionSchema = z.object({
	name: z.string(),
	text: z.string(),
	prof: z.object({}),
})

/**
 * @swagger
 *  tags:
 *    name: Receitas
 *    description: Recursos para gerenciamento de receitas.
 * /prescriptions:
 *   get:
 *     summary: Retorna todas as receitas ativas do usuário logado
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de receitas ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescription'
 *   post:
 *     summary: Cria uma nova prescrição
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       200:
 *         description: Prescrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 *   put:
 *     summary: Atualiza uma prescrição existente
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       200:
 *         description: Prescrição atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 *   delete:
 *     summary: Deleta uma prescrição existente
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prescrição deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 * /prescriptions/inactives:
 *   get:
 *     summary: Retorna todas as receitas inativas do usuário logado
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de receitas inativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescription'
 * /prescriptions/{id}:
 *   get:
 *     summary: Retorna uma prescrição pelo ID
 *     tags:
 *       - Receitas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prescrição encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 */
class PrescriptionController {
	async index(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())
		return adaptRoute(makeFindAllPrescriptionsComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async store(ctx: HttpContextContract) {
		return adaptRoute(makePrescriptionsCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makePrescriptionsUpdateComposer(), ctx)
	}

	async updateStatus(ctx: HttpContextContract) {
		return adaptRoute(makePrescriptionsUpdateStatusComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makePrescriptionsFindByIdComposer(), ctx)
	}

	async destroy({ params }) {
		const prescriptions = await Prescription.findByIdAndDelete(params.id).orFail()
		return prescriptions
	}
}

export default PrescriptionController
