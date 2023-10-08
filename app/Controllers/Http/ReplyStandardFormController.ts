import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReplyFormStandardFranchisesEntity from 'App/Core/domain/entities/reply-form-standard-franchises/reply-form-standard-franchises'
import { UnitNotFranchise } from 'App/Core/domain/errors/unit-not-franchise'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import ReplyFormStandardFranchises from 'App/Models/ReplyFormStandardFranchises'
import { TypeForms } from 'App/Types/IBusinessFranchises'
import {
	IReplyFormStandardFranchises
} from "App/Types/IReplyFormStandardFranchises"


// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
class ReplyStandardFormController {
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
		const body = ctx.request.body() as IReplyFormStandardFranchises

		const businessFranchise = await BusinessFranchises.findOne({ unities: user?.unity_id }).exec()

		if (!businessFranchise) throw new UnitNotFranchise()

		const entityOrErr = await ReplyFormStandardFranchisesEntity.build({
			...body,
			prof: user?._id as string,
			franchise: businessFranchise._id,
			unity_id: user?.unity_id as string,
		})

		if (entityOrErr.isLeft()) throw entityOrErr.extract()

		const entity = entityOrErr.extract()

		return await ReplyFormStandardFranchises.create(entity)
	}
}

export default ReplyStandardFormController
