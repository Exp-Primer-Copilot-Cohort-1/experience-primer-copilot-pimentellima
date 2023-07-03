import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import { makeVerifyScheduleComposer } from "App/Core/composers/schedule/schedule-composer";

class ScheduleController {
	async verifySchedule(ctx: HttpContextContract) {
		return adaptRoute(makeVerifyScheduleComposer(), ctx);
	}
}

export default ScheduleController;
