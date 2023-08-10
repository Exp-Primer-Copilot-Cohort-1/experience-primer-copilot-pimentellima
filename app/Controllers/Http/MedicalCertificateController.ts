import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeMedicalCertificateCreateComposer,
	makeMedicalCertificateDeleteByIdComposer,
	makeMedicalCertificateFindByNameComposer,
	makeMedicalCertificateShowByIdComposer,
	makeMedicalCertificateUpdateByIdComposer,
} from 'App/Core/composers'
import MedicalCertificate from 'App/Models/MedicalCertificate'

class MedicalCertificateController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeMedicalCertificateFindByNameComposer(), ctx, { unity_id })
	}

	async findAllInatives(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const medicalCertificate = await MedicalCertificate.find({
			active: false,
			unity_id,
		})

		return medicalCertificate
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeMedicalCertificateCreateComposer(), ctx, { unity_id })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateUpdateByIdComposer(), ctx)
	}

	async updateStatus({ params, request }) {
		const data = request.only(['status'])

		const prescription = await MedicalCertificate.findByIdAndUpdate(
			params.id,
			{
				$set: { active: data.status },
			},
			{ new: true },
		)

		return prescription
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateShowByIdComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateDeleteByIdComposer(), ctx)
	}
}

export default MedicalCertificateController
