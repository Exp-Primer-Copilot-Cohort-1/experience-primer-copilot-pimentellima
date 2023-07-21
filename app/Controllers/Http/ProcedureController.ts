import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeProceduresCreateComposer } from 'App/Core/composers'
import { makeProceduresUpdateByIdComposer } from 'App/Core/composers/procedures'
import { makeProceduresDeleteByIdComposer } from 'App/Core/composers/procedures/make-procedures-delete-by-id-composer'
import { makeProceduresFindAllComposer } from 'App/Core/composers/procedures/make-procedures-find-all-composer'
import Procedure from 'App/Models/Procedure'

class ProcedureController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id

		return adaptRoute(makeProceduresFindAllComposer(), ctx, { unity_id })
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeProceduresCreateComposer(), ctx, { unity_id })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresUpdateByIdComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresDeleteByIdComposer(), ctx)
	}

	async addProduct(ctx: HttpContextContract) {
		await Procedure.findByIdAndUpdate(ctx.params.id, {
			$push: {
				products: ctx.request.body,
			},
		})
		return ctx.response.ok({ message: 'Produto adicionado com sucesso' })
	}

	async removeProduct(ctx: HttpContextContract) {
		await Procedure.findByIdAndUpdate(ctx.params.id, {
			$pull: {
				products: ctx.request.body,
			},
		})
		return ctx.response.ok({ message: 'Produto removido com sucesso' })
	}
}

export default ProcedureController
