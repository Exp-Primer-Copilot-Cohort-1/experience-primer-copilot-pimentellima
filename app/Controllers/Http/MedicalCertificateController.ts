import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCounts,
	makeMedicalCertificateCreateComposer,
	makeMedicalCertificateDeleteByIdComposer,
	makeMedicalCertificateFindByNameComposer,
	makeMedicalCertificateShowByIdComposer,
	makeMedicalCertificateUpdateByIdComposer,
} from 'App/Core/composers'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import MedicalCertificate, { COLLECTION_NAME } from 'App/Models/MedicalCertificate'

/**
 * Controlador responsável por lidar com as requisições relacionadas a atestados médicos.
 * @swagger
 * tags:
 *   name: Atestado Médico
 *   description: Endpoints para gerenciamento de atestados médicos.
 */
class MedicalCertificateController {
	/**
	 * Retorna uma lista de atestados médicos com base no nome do paciente.
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista de atestados médicos.
	 */
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeMedicalCertificateFindByNameComposer(), ctx, { unity_id })
	}

	/**
	 * Retorna uma lista de atestados médicos inativos.
	 * @param ctx O contexto da requisição.
	 * @returns Uma lista de atestados médicos inativos.
	 */
	async findAllInatives(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const medicalCertificate = await MedicalCertificate.find({
			active: false,
			unity_id,
		})

		return medicalCertificate
	}

	/**
	 * Cria um novo atestado médico.
	 * @param ctx O contexto da requisição.
	 * @returns O atestado médico criado.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeMedicalCertificateCreateComposer(), ctx, { unity_id })
	}

	/**
	 * Atualiza um atestado médico existente.
	 * @param ctx O contexto da requisição.
	 * @returns O atestado médico atualizado.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateUpdateByIdComposer(), ctx)
	}

	/**
	 * Atualiza o status de um atestado médico existente.
	 * @param params Os parâmetros da requisição.
	 * @param request O corpo da requisição.
	 * @returns O atestado médico atualizado.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateStatus({ params, request }) {
		const data = request.only(['status'])

		const prescription = await MedicalCertificate.findByIdAndUpdate(
			params.id,
			{
				$set: { active: data.status },
			},
			{ new: true },
		)

		return prescription
	}

	/**
	 * Retorna um atestado médico com base no seu ID.
	 * @param ctx O contexto da requisição.
	 * @returns O atestado médico encontrado.
	 */
	async show(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateShowByIdComposer(), ctx)
	}

	/**
	 * Deleta um atestado médico existente.
	 * @param ctx O contexto da requisição.
	 * @returns O atestado médico deletado.
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateDeleteByIdComposer(), ctx)
	}

	async counts(ctx: HttpContextContract) {
		const opts = getterOptInRequest(ctx)
		return adaptRoute(makeCounts(opts, COLLECTION_NAME), ctx)
	}
}

/**
 * @swagger
 * tags:
 *   name: Atestado Médico
 *   description: Rotas para gerenciamento de atestados médicos.
 *
 * /medical-certificates:
 *   get:
 *     summary: Retorna uma lista de atestados médicos com base no nome do paciente.
 *     tags: [Atestado Médico]
 *     responses:
 *       200:
 *         description: Lista de atestados médicos encontrados.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 *   post:
 *     summary: Cria um novo atestado médico.
 *     tags: [Atestado Médico]
 *     responses:
 *       200:
 *         description: Atestado médico criado com sucesso.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /medical-certificates/inactives:
 *   get:
 *     summary: Retorna uma lista de atestados médicos inativos.
 *     tags: [Atestado Médico]
 *     responses:
 *       200:
 *         description: Lista de atestados médicos inativos encontrados.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /medical-certificates/{id}:
 *   get:
 *     summary: Retorna um atestado médico com base no seu ID.
 *     tags: [Atestado Médico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do atestado médico.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atestado médico encontrado.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 *   put:
 *     summary: Atualiza um atestado médico existente.
 *     tags: [Atestado Médico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do atestado médico.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atestado médico atualizado com sucesso.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 *   delete:
 *     summary: Deleta um atestado médico existente.
 *     tags: [Atestado Médico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do atestado médico.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atestado médico deletado com sucesso.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /medical-certificates/{id}/status:
 *   put:
 *     summary: Atualiza o status de um atestado médico existente.
 *     tags: [Atestado Médico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do atestado médico.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: O novo status do atestado médico.
 *     responses:
 *       200:
 *         description: Atestado médico atualizado com sucesso.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

export default MedicalCertificateController
