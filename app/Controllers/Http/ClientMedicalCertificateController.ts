import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientMedicalCertificate from 'App/Models/ClientMedicalCertificate'

class ClientMedicalCertificateController {
	async findByClient(ctx: HttpContextContract) {
		const medicalCertificate = await ClientMedicalCertificate.find({
			'client.value': ctx.params.client_id,
		})
		return medicalCertificate
	}

	async store(ctx: HttpContextContract) {
		const data = ctx.request.all()

		const medicalCertificate = await ClientMedicalCertificate.create({
			unity_id: ctx.auth.user?.unity_id,
			...data,
		})
		return medicalCertificate
	}
}

export default ClientMedicalCertificateController
