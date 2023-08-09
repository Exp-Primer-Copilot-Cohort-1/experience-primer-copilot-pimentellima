import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClientSickNote from "App/Models/ClientSickNote";

class ClientSickNoteController {
	async findByClient(ctx: HttpContextContract) {
		const sicknotes = await ClientSickNote.find({
			"client.value": ctx.params.client_id,
		});
		return sicknotes;
	}

	async store(ctx: HttpContextContract) {
		const data = ctx.request.all();

		const sicknote = await ClientSickNote.create({
			unity_id: ctx.auth.user?.unity_id,
			...data,
		});
		return sicknote;
	}
}

export default ClientSickNoteController;
