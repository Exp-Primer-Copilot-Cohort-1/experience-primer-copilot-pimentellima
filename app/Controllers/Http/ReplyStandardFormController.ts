import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReplyFormStandardFranchises from 'App/Models/ReplyFormStandardFranchises'
import { TypeForms } from 'App/Types/IBusinessFranchises'

import { adaptRoute } from 'App/Core/adapters'
import { makeCreateRFormsStandardFUseCase } from 'App/Core/composers/reply-form-standard-franchise/make'

class ReplyStandardFormController {

	// ! AVISO
	// ! refatorar para usar o padrão da nossa arquitetura
	async show(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { activity } = ctx.params
		const type = ctx.request.qs().type || TypeForms.START

		if (!activity) return ctx.response.status(400).send({ message: 'Dados inválidos' })

		const doc = await ReplyFormStandardFranchises.findOne({
			unity_id,
			activity,
			type,
		}).exec()


		if (!doc) return ctx.response.status(404).send({ message: 'Formulário não encontrado' })

		return doc
	}


	async store(ctx: HttpContextContract) {
		const user = ctx.auth.user
		return adaptRoute(makeCreateRFormsStandardFUseCase(), ctx, {
			unity_id: user?.unity_id as string,
			prof: user?._id as string,
		})
	}
}

export default ReplyStandardFormController
