import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateScheduleBlockComposer,
	makeDeleteScheduleBlockByIdComposer,
	makeFindAllScheduleBlocksComposer,
	makeFindScheduleBlocksByProfIdComposer,
} from 'App/Core/composers/schedule_block/schedule_block-composer'
import { COLLECTION_NAME } from 'App/Models/ScheduleBlock'
import LogDecorator, { ACTION } from '../Decorators/Log'

class ScheduleBlockController {
	async findAllScheduleBlocks(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllScheduleBlocksComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findScheduleBlocksByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindScheduleBlocksByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createScheduleBlock(ctx: HttpContextContract) {
		return adaptRoute(makeCreateScheduleBlockComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async deleteScheduleBlockById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteScheduleBlockByIdComposer(), ctx)
	}
}

export default ScheduleBlockController
