import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
;('use strict')

import Form from 'App/Models/Form'

class FormController {
	async findAllForms(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const forms = await Form.find({ unity_id: user?.unity_id, active: true })
		return forms
	}

	async findFormById(ctx: HttpContextContract) {
		const form = await Form.findById(ctx.params.id)
		return form
	}

	async findAllInactiveForms(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const forms = await Form.find({ unity_id: user?.unity_id, active: false })
		return forms
	}

	async createNewForm(ctx: HttpContextContract) {
		const user = ctx.auth.user
		const data = ctx.request.all()
		const newForm = await Form.create({...data, unity_id: user?.unity_id})
		return newForm
	}

	async updateForm(ctx: HttpContextContract) {
		const id = ctx.params.id
		const data = ctx.request.all()

		const form = await Form.findByIdAndUpdate(id, data)
		return form
	}

	async updateFormStatus(ctx: HttpContextContract) {
		const { active } = ctx.request.only(['active'])
		const id = ctx.params.id

		const form = await Form.findByIdAndUpdate(id, {
			$set: {
				active,
			},
			new: true,
		})
		return form
	}
}

export default FormController
