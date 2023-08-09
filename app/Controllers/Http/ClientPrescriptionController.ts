import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClientPrescription from "App/Models/ClientPrescription";

class ClientPrescriptionController {
	async findByClient(ctx: HttpContextContract) {
		const prescriptions = await ClientPrescription.find({
			"client.value": ctx.params.client_id,
		});
		return prescriptions;
	}

	async store(ctx: HttpContextContract) {
		const data = ctx.request.all();

		const prescriptions = await ClientPrescription.create({
			unity_id: ctx.auth.user?.unity_id,
			...data,
		});
		return prescriptions;
	}
}

export default ClientPrescriptionController;
