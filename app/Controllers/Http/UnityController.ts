import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeUnityFindAllByNameComposer, makeUnityShowByIdComposer, makeUnityUpdateByIdComposer, makeUpdateUnityPictureComposer } from 'App/Core/composers/users/unities/make'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import Unity, { COLLECTION_NAME } from 'App/Models/Unity'

/**
 * Controller responsável por gerenciar as rotas relacionadas a unidades.
 * @swagger
 * tags:
 *  name: Unidades
 *  description: Endpoints para gerenciamento de unidades.
 */
class UnityController {
	/**
	 * @swagger
	 * /unity:
	 *   get:
	 *     summary: Retorna todas as unidades.
	 *     tags: [Unidades]
	 *     responses:
	 *       200:
	 *         description: Lista de todas as unidades.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Unity'
	 */
	public async index(ctx: HttpContextContract) {
		return adaptRoute(makeUnityFindAllByNameComposer(), ctx)
	}
	

	/**
	 * @swagger
	 * /unity/{email}:
	 *   get:
	 *     summary: Retorna uma unidade pelo email.
	 *     tags: [Unidades]
	 *     parameters:
	 *       - in: path
	 *         name: email
	 *         required: true
	 *         description: Email da unidade.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Unidade encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Unity'
	 *       404:
	 *         description: Unidade não encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: object
	 *                   properties:
	 *                     message:
	 *                       type: string
	 */

	async updateUnityPicture(ctx: HttpContextContract) {
		const unity_id: string = ctx.auth.user?.unity_id as string
		return adaptRoute(makeUpdateUnityPictureComposer(), ctx, {
			request: ctx.request,
			unity_id
		})
	
	}
	public async findByName({ params, response }: HttpContextContract) {
		const { email } = params

		const unity = await Unity.findOne(
			{
				email,
				active: true,
			},
			{ _id: 0, name: 1 },
		)

		if (!unity) {
			return response.status(404).send({
				error: {
					message: 'Unidade não encontrada.',
				},
			})
		}

		return unity
	}

	/**
	 * @swagger
	 * /unity/{id}:
	 *   put:
	 *     summary: Atualiza uma unidade pelo ID.
	 *     tags: [Unidades]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID da unidade.
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       description: Dados da unidade a ser atualizada.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Unity'
	 *     responses:
	 *       200:
	 *         description: Unidade atualizada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Unity'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async update(ctx: HttpContextContract) {
		ctx.bouncer.with('UnitiesPolicy').authorize('update')
		return adaptRoute(makeUnityUpdateByIdComposer(), ctx)
	}

	/**
	 * @swagger
	 * /unity/{id}:
	 *   get:
	 *     summary: Retorna uma unidade pelo ID.
	 *     tags: [Unidades]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID da unidade.
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Unidade encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Unity'
	 *       404:
	 *         description: Unidade não encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: object
	 *                   properties:
	 *                     message:
	 *                       type: string
	 */
	public async show(ctx: HttpContextContract) {
		ctx.bouncer.with('UnitiesPolicy').authorize('view')
		return adaptRoute(makeUnityShowByIdComposer(), ctx)
	}

	public async showProfile(ctx: HttpContextContract) {
		ctx.bouncer.with('UnitiesPolicy').authorize('view')
		return adaptRoute(makeUnityShowByIdComposer(), ctx, {
			id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async updateProfile(ctx: HttpContextContract) {
		ctx.bouncer.with('UnitiesPolicy').authorize('update')
		return adaptRoute(makeUnityUpdateByIdComposer(), ctx, {
			_id: ctx.auth.user?.unity_id,
		})
	}
}

export default UnityController
