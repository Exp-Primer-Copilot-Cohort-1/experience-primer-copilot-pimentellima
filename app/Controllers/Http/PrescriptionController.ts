import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import Prescription from 'App/Models/Prescription'
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
	async index({ auth, request }) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
			active: opts.active,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })
		return prescriptions
	}

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await (
			await Prescription.create({
				...data,
				prof: data.prof.value,
				unity_id: userLogged.unity_id,
			})
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescription
	}

	async update({ params, request }) {
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await Prescription.findByIdAndUpdate(
			params.id,
			{
				...data,
				prof: data.prof.value,
			},
			{
				new: true,
			},
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescription
	}

	async updateStatus({ params, request }) {
		const data = request.only(['status'])

		const prescription = await Prescription.findByIdAndUpdate(
			params.id,
			{
				$set: { active: data.status },
			},
			{ new: true },
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescription
	}

	async show({ params }) {
		const prescriptions = await Prescription.where({
			_id: params.id,
		})
			.populate('prof', { label: '$name', value: '$_id', _id: 0 })
			.orFail()

		return prescriptions
	}

	async destroy({ params }) {
		const prescriptions = await Prescription.findByIdAndDelete(params.id).orFail()
		return prescriptions
	}
}

export default PrescriptionController
