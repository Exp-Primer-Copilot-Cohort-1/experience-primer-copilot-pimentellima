import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left } from 'App/Core/shared'

import Form from 'App/Models/Form'

class FormController {
	async findAllForms(ctx: HttpContextContract) {
		try {
			const user = ctx.auth.user
			if (!user) throw new Error()
			const forms = await Form.find({
				$or: [
					{ 'prof.value': user?._id, active: true },
					{
						unity_id: user?.unity_id,
						active: true,
						'profs_with_access.value': user._id,
					},
				],
			})
			return forms
		} catch (err) {
			return left(new AbstractError('Internal error', 500))
		}
	}

	async findFormById(ctx: HttpContextContract) {
		const form = await Form.findById(ctx.params.id)
		return form
	}

	async findAllInactiveForms(ctx: HttpContextContract) {
		try {
			const user = ctx.auth.user
			if (!user) throw new Error()
			const forms = await Form.find({
				$or: [
					{ 'prof.value': user?._id, active: false },
					{
						unity_id: user?.unity_id,
						active: false,
						'profs_with_access.value': user._id,
					},
				],
			})
			return forms
		} catch (err) {
			return left(new AbstractError('Internal error', 500))
		}
	}

	async createNewForm(ctx: HttpContextContract) {
		try {
			const user = ctx.auth.user
			if (!user) throw new Error()
			const data = ctx.request.all()

			const newForm = await Form.create({ ...data, unity_id: user?.unity_id })
			return newForm
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Internal error', 500))
		}
	}

	async updateForm(ctx: HttpContextContract) {
		const user = ctx.auth.user
		if (!user) throw new Error()
		const id = ctx.params.id
		const data = ctx.request.all()

		const form = await Form.findByIdAndUpdate(id, data)
		if (form?.prof.value !== user._id)
			return left(new AbstractError('Unauthorized', 401))
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
