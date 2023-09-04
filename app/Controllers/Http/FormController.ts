'use strict'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateFormComposer } from 'App/Core/composers/form/make-create-form-composer'
import { makeDeleteFormByIdComposer } from 'App/Core/composers/form/make-delete-form-by-id-composer'
import { makeFindAllFormsComposer } from 'App/Core/composers/form/make-find-all-forms-composer'
import { makeFindFormByCategoryIdComposer } from 'App/Core/composers/form/make-find-form-by-category-id-composer'
import { makeFindFormByIdComposer } from 'App/Core/composers/form/make-find-form-by-id-composer'
import { makeFindFormByProfIdComposer } from 'App/Core/composers/form/make-find-form-by-prof-id-composer'
import { makeUpdateFormComposer } from 'App/Core/composers/form/make-update-form-composer'

class FormController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllFormsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeFindFormByIdComposer(), ctx)
	}

	async findFormByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindFormByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findFormByCategoryId(ctx: HttpContextContract) {
		return adaptRoute(makeFindFormByCategoryIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async store(ctx: HttpContextContract) {
		return adaptRoute(makeCreateFormComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateFormComposer(), ctx)
	}

	async deleteFormById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteFormByIdComposer(), ctx)
	}
}

export default FormController
