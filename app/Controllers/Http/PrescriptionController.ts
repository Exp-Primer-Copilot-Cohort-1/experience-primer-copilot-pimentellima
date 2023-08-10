import Prescription from 'App/Models/Prescription'
import { z } from 'zod'

const prescriptionSchema = z.object({
	name: z.string(),
	text: z.string(),
	prof: z.object({}),
})

class PrescriptionController {
	async index({ request, auth }) {
		const userLogged = auth.user
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
			active: true,
		})
		return prescriptions
	}

	async findAllInatives({ request, auth }) {
		const userLogged = auth.user
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
			active: false,
		})

		return prescriptions
	}

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await Prescription.create({
			...data,
			unity_id: userLogged.unity_id,
		})

		return prescription
	}

	async update({ params, request }) {
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await Prescription.findByIdAndUpdate(params.id, data, {
			new: true,
		})

		return prescription
	}

	async updateStatus({ params, request }) {
		const data = request.only(['status'])

		const prescription = await Prescription.findByIdAndUpdate(
			params.id,
			{
				$set: { active: data.status },
			},
			{ new: true },
		)

		return prescription
	}

	async show({ params }) {
		const prescriptions = await Prescription.where({
			_id: params.id,
		}).orFail()

		return prescriptions
	}

	async destroy({ params }) {
		const prescriptions = await Prescription.findByIdAndDelete(params.id).orFail()
		return prescriptions
	}
}

export default PrescriptionController
