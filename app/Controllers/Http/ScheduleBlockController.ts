import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import {
	makeCreateScheduleBlockComposer,
	makeDeleteScheduleBlockByIdComposer,
	makeFindAllScheduleBlocksComposer,
} from "App/Core/composers/schedule_block/schedule_block-composer";

class ScheduleBlockController {
	async findAllScheduleBlocks(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllScheduleBlocksComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async createScheduleBlock(ctx: HttpContextContract) {
		return adaptRoute(makeCreateScheduleBlockComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async deleteScheduleBlockById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteScheduleBlockByIdComposer(), ctx);
	}
}

export default ScheduleBlockController;
