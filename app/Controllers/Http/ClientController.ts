import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCounts } from 'App/Core/composers'
import {
	makeClientCreateComposer,
	makeClientFindAllComposer,
	makeClientUpdateComposer,
	makeGetFormAnswersComposer,
	makePutFormAnswerComposer,
	makePutTreatmentPicturesComposer,
	makeUpdateClientPictureComposer,
} from 'App/Core/composers/clients/make'
import getterOptInRequest from 'App/Core/domain/entities/helpers/getter-opt-in-request'
import { PROJECTION_DEFAULT } from 'App/Core/domain/repositories/helpers/projections'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left } from 'App/Core/shared'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import Client, { COLLECTIONS_REFS, COLLECTION_NAME } from 'App/Models/Client'
import { IUserClient } from 'App/Types/IClient'
import { IFormAnswer } from 'Types/IFormAnswer'

// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
class ClientController {
	async putTreatmentPictures(ctx: HttpContextContract) {
		return adaptRoute(makePutTreatmentPicturesComposer(), ctx, {
			request: ctx.request,
		})
	}

	async updateClientPicture(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateClientPictureComposer(), ctx, {
			request: ctx.request,
		})
	}

	async verifyExistenceClient({ request, auth, response }: HttpContextContract) {
		const { name, birth_date } = request.all()
		const unity_id = auth.user?.unity_id
		if (!name || !birth_date) {
			return response.status(400).json({
				message: 'Missing Name Or Birth Day',
			})
		}

		const user = await Client.findOne({
			name,
			birth_date,
			unity_id,
		})

		if (!user) {
			return response.status(404).json({
				message: 'Client Not Found',
			})
		}

		return user
	}

	async createMany({ request, auth, response }: HttpContextContract) {
		const data: IUserClient[] = Object.keys(request.all()).map(
			(key) => request.all()[key],
		)
		const unity_id = auth.user?.unity_id

		const users = await Promise.all(
			data?.map(async (clientData) => {
				const { name, birth_date, email, celphone } = clientData
				if (!name || !celphone) {
					return response.status(400).json({
						message: 'Missing Name Or CellPhone',
					})
				}

				const userData = await Client.findOne({
					email,
					name,
					birth_date,
					unity_id,
				})

				if (userData?.active) {
					return response.status(400).send({
						error: {
							message: 'Este cliente já está cadastrado na unidade.',
						},
					})
				}

				return await Client.create({
					...clientData,
					unity_id: unity_id,
					active: true,
					due_date: null,
					email,
				})
			}),
		)

		return users
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async create(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeClientCreateComposer(), ctx, {
			unity_id,
		})
	}

	async counts(ctx: HttpContextContract) {
		return adaptRoute(makeCounts(ctx, COLLECTION_NAME), ctx)
	}

	async index(ctx: HttpContextContract) {
		const opts = getterOptInRequest(ctx)
		return adaptRoute(makeClientFindAllComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findUserClientByID({ params }) {
		const user = await Client.findById(params.id).populate(
			COLLECTIONS_REFS.PARTNERS,
			PROJECTION_DEFAULT,
		)

		return user
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeClientUpdateComposer(), ctx, {
			unity_id,
		})
	}

	async getAnswers(ctx: HttpContextContract) {
		const prof_id = ctx.auth.user?._id
		return adaptRoute(makeGetFormAnswersComposer(), ctx, {
			prof_id: prof_id?.toString(),
			client_id: ctx.params.id
		})
	}

	async putAnswer(ctx: HttpContextContract) {
		return adaptRoute(makePutFormAnswerComposer(), ctx)
	}
}

export default ClientController
