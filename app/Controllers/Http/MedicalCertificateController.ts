import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeMedicalCertificateCreateComposer,
	makeMedicalCertificateDeleteByIdComposer,
	makeMedicalCertificateFindByNameComposer,
	makeMedicalCertificateShowByIdComposer,
	makeMedicalCertificateUpdateByIdComposer,
} from 'App/Core/composers'
import MedicalCertificate, { COLLECTION_NAME } from 'App/Models/MedicalCertificate'
import LogDecorator, { ACTION } from '../Decorators/Log'

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

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeMedicalCertificateCreateComposer(), ctx, { unity_id })
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateUpdateByIdComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
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

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeMedicalCertificateDeleteByIdComposer(), ctx)
	}
}

export default MedicalCertificateController
