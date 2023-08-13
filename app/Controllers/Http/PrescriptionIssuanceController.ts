import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PrescriptionIssuance from "App/Models/PrescriptionIssuance";

class PrescriptionIssuanceController {
	async findByClient(ctx: HttpContextContract) {
		const prescriptions = await PrescriptionIssuance.find({
			"client.value": ctx.params.client_id,
		});
		return prescriptions;
	}

	async store(ctx: HttpContextContract) {
		const data = ctx.request.all();

		const prescriptions = await PrescriptionIssuance.create({
			unity_id: ctx.auth.user?.unity_id,
			...data,
		});
		return prescriptions;
	}
}

export default PrescriptionIssuanceController;
