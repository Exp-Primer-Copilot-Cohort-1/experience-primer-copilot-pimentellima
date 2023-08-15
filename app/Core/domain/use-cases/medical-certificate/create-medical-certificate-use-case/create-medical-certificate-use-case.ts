import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import LogDecorator from 'App/Core/decorators/log-decorator'
import { IMedicalCertificate } from 'Types/IMedicalCertificate'
import { MedicalCertificateManagerInterface } from '../../../repositories/interface'

export class CreateMedicalCertificateUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		private readonly medicalCertificateManager: MedicalCertificateManagerInterface,
	) { }

	@LogDecorator('medical-certificates', 'post')
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
