import Prescription from 'App/Models/Prescription'
import { z } from 'zod'

const prescriptionSchema = z.object({
	name: z.string(),
	text: z.string(),
	prof: z.object({}),
})

class PrescriptionController {
	async index({ auth }) {
		const userLogged = auth.user
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
			active: true,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })
		return prescriptions
	}

	async findAllInatives({ auth }) {
		const userLogged = auth.user
		const prescriptions = await Prescription.where({
			unity_id: userLogged.unity_id,
			active: false,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescriptions
	}

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await (
			await Prescription.create({
				...data,
				prof: data.prof.value,
				unity_id: userLogged.unity_id,
			})
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescription
	}

	async update({ params, request }) {
		const data = request.all()

		prescriptionSchema.parse(data)

		const prescription = await Prescription.findByIdAndUpdate(
			params.id,
			{
				...data,
				prof: data.prof.value,
			},
			{
				new: true,
			},
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

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
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return prescription
	}

	async show({ params }) {
		const prescriptions = await Prescription.where({
			_id: params.id,
		})
			.populate('prof', { label: '$name', value: '$_id', _id: 0 })
			.orFail()

		return prescriptions
	}

	async destroy({ params }) {
		const prescriptions = await Prescription.findByIdAndDelete(params.id).orFail()
		return prescriptions
	}
}

export default PrescriptionController
