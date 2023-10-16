import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

export class UpdateMedicalCertificateByIdUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		private readonly medicalCertificateManager: MedicalCertificateManagerInterface,
	) { } // eslint-disable-line

	public async execute(
		medicalCertificate: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		if (!medicalCertificate?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const medicalCertificateOrErr =
			await this.medicalCertificateManager.updateMedicalCertificateById(
				medicalCertificate._id.toString(),
				medicalCertificate,
			)

		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return medicalCertificateOrErr
	}
}
