import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCategoriesDeleteByIdComposer,
	makeCategoriesFindByUnityComposer,
	makeCategoriesShowByIdComposer,
	makeCategoriesUpdateByIdComposer,
} from 'App/Core/composers'
import { makeCategoriesCreateComposer } from 'App/Core/composers/categories/make-categories-create-composer'
import { COLLECTION_NAME } from 'App/Models/Category'
import LogDecorator, { ACTION } from '../Decorators/Log'

class CategoryController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCategoriesFindByUnityComposer(), ctx, { unity_id })
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesUpdateByIdComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesShowByIdComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeCategoriesDeleteByIdComposer(), ctx)
	}
}

export default CategoryController
