import Prescription from "App/Models/Prescription";

class PrescriptionController {
	async index({ request, auth }) {
		const userLogged = auth.user;
		console.log(request)
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
		});

		return prescriptions;
	}

	async store({ request, auth }) {
		const userLogged = auth.user;
		const data = request.all();

		const prescription = await Prescription.create({
			...data,
			unity_id: userLogged.unity_id
		});

		return prescription;
	}

	async update({ params, request }) {
		const data = request.all();
		const prescription = await Prescription.findByIdAndUpdate(
			params.id,
			data,
			{
				new: true,
			}
		);

		return prescription;
	}

	async show({ params }) {
		const prescriptions = await Prescription.where({
			_id: params.id,
		}).orFail();

		return prescriptions;
	}

	async destroy({ params }) {
		const prescriptions = await Prescription.findByIdAndDelete(
			params.id
		).orFail();
		return prescriptions;
	}
}

export default PrescriptionController;
