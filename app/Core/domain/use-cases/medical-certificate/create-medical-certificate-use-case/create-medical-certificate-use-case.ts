import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

export class CreateMedicalCertificateUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		private readonly medicalCertificateManager: MedicalCertificateManagerInterface,
	) { }

	public async execute(
		medicalCertificate: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificateOrErr =
			await this.medicalCertificateManager.createMedicalCertificate(
				medicalCertificate,
			)

		return medicalCertificateOrErr
	}
}
