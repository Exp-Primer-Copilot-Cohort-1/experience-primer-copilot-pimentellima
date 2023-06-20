import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCategoriesDeleteByIdComposer,
	makeCategoriesFindByUnityComposer,
	makeCategoriesShowByIdComposer,
	makeCategoriesUpdateByIdComposer,
} from 'App/Core/composers'
import { makeCategoriesCreateComposer } from 'App/Core/composers/categories/make-categories-create-composer'

class CategoryController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCategoriesFindByUnityComposer(), ctx, { unity_id })
	}

	async store(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesUpdateByIdComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesShowByIdComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesDeleteByIdComposer(), ctx)
	}
}

export default CategoryController
