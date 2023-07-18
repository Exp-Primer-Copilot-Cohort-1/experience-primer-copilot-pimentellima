import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import { makeGetWorkHoursComposer } from "App/Core/composers/schedule/schedule-composer";

class ScheduleController {
	async getWorkHours(ctx: HttpContextContract) {
		return adaptRoute(makeGetWorkHoursComposer(), ctx);
	}
}

export default ScheduleController;
