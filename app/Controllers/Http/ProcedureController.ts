import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeProceduresCreateComposer } from 'App/Core/composers'
import { makeProceduresUpdateByIdComposer } from 'App/Core/composers/procedures'
import { makeProceduresDeleteByIdComposer } from 'App/Core/composers/procedures/make-procedures-delete-by-id-composer'
import { makeProceduresFindAllComposer } from 'App/Core/composers/procedures/make-procedures-find-all-composer'

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
}

export default ProcedureController
