import { adaptRoute } from 'App/Core/adapters';
import { makeUnityFindAllByNameComposer } from 'App/Core/composers/unities/make-composer-unity-find-by-name';
import Permission from 'App/Models/Permission';
import Unity from 'App/Models/Unity';
class UnityController {
	public async index(ctx) {
		return adaptRoute(makeUnityFindAllByNameComposer(), ctx);
	}

	public async store({ request, response }) {
		const data = request.only([
			'name',
			'is_company',
			'document',
			'phones',
			'cnaes',
			'site',
			'cep',
			'address',
			'neighbohood',
			'address_number',
			'complement',
			'city',
			'state',
			'country',
			'obs',
			'schedule_obs',
			'date_expiration',
		]);

		const unityData = await Unity.where({
			...data,
			name: data.name,
			name_company: data.name,
			active: true,
		}).first();

		if (unityData) {
			return response.status(400).send({
				error: {
					message: 'Esta unidade já está cadastrada.',
				},
			});
		}
		const permission = {};
		permission.admin_activity = true;
		permission.admin_prof_activity = true;
		permission.prof_activity = true;
		permission.sec_activity = true;
		permission.admin_activity_await = true;
		permission.admin_prof_activity_await = true;
		permission.prof_activity_await = true;
		permission.sec_activity_await = true;
		permission.admin_answers = true;
		permission.admin_prof_answers = true;
		permission.prof_answers = true;
		permission.sec_answers = true;
		permission.admin_answers_historic = true;
		permission.admin_prof_answers_historic = true;
		permission.prof_answers_historic = true;
		permission.sec_answers_historic = true;
		permission.admin_clients = true;
		permission.admin_prof_clients = true;
		permission.prof_clients = true;
		permission.sec_clients = true;
		permission.admin_company = true;
		permission.admin_prof_company = true;
		permission.prof_company = true;
		permission.sec_company = true;
		permission.admin_form = true;
		permission.admin_prof_form = true;
		permission.prof_form = true;
		permission.sec_form = true;
		permission.admin_form_historic = true;
		permission.admin_prof_form_historic = true;
		permission.prof_form_historic = true;
		permission.sec_form_historic = true;
		permission.admin_clients_list = true;
		permission.admin_prof_clients_list = true;
		permission.prof_clients_list = true;
		permission.sec_clients_list = true;
		permission.admin_prof_list = true;
		permission.admin_prof_prof_list = true;
		permission.prof_prof_list = true;
		permission.sec_prof_list = true;
		permission.admin_sec_list = true;
		permission.admin_prof_sec_list = true;
		permission.prof_sec_list = true;
		permission.sec_sec_list = true;
		permission.admin_my_activities = true;
		permission.admin_prof_my_activities = true;
		permission.prof_my_activities = true;
		permission.sec_my_activities = true;
		permission.admin_partner = true;
		permission.admin_prof_partner = true;
		permission.prof_partner = true;
		permission.sec_partner = true;
		permission.admin_partner_create = true;
		permission.admin_prof_partner_create = true;
		permission.prof_partner_create = true;
		permission.sec_partner_create = true;
		permission.admin_permissions = true;
		permission.admin_prof_permissions = true;
		permission.prof_permissions = true;
		permission.sec_permissions = true;
		permission.admin_procedures = true;
		permission.admin_prof_procedures = true;
		permission.prof_procedures = true;
		permission.sec_procedures = true;
		permission.admin_procedures_create = true;
		permission.admin_prof_procedures_create = true;
		permission.prof_procedures_create = true;
		permission.sec_procedures_create = true;
		permission.admin_schedule = true;
		permission.admin_prof_schedule = true;
		permission.prof_schedule = true;
		permission.sec_schedule = true;
		permission.admin_category = true;
		permission.admin_prof_category = true;
		permission.prof_category = true;
		permission.sec_category = true;
		const unity = await Unity.create({ ...data, active: true });
		await Permission.create({
			...permission,
			unity_id: unity._id,
		});

		return unity;
	}

	public async update({ params, request }) {
		const unity = await Unity.where({ _id: params.id }).first();
		if (unity) {
			const data = request.all();
			unity.merge(data);
			await unity.save();
			return unity;
		}
		return false;
	}

	public async show({ params }) {
		const unity = await Unity.with('users')
			.where({ _id: params.id })
			.firstOrFail();

		return unity;
	}

	public async destroy({ params }) {
		const unity = await Unity.where({ _id: params.id }).firstOrFail();
		await unity.delete();
	}
}

export default UnityController;
