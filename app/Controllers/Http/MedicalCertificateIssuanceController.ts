import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MedicalCertificateIssuance from 'App/Models/MedicalCertificateIssuance'

class MedicalCertificateIssuanceController {
	async findByClient(ctx: HttpContextContract) {
		const medicalCertificate = await MedicalCertificateIssuance.find({
			'client.value': ctx.params.client_id,
		})
		return medicalCertificate
	}

	async store(ctx: HttpContextContract) {
		const data = ctx.request.all()

		const medicalCertificate = await MedicalCertificateIssuance.create({
			unity_id: ctx.auth.user?.unity_id,
			...data,
		})
		return medicalCertificate
	}
}

export default MedicalCertificateIssuanceController
