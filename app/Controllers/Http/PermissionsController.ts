import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'

import {
	makeFindPermissionsComposers,
	makeUpdatePermissionsComposers,
} from 'App/Core/composers'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { COLLECTION_NAME } from 'App/Models/User'

class PermissionsController {

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeFindPermissionsComposers(ctx), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeUpdatePermissionsComposers(ctx), ctx)
	}
}

export default PermissionsController
