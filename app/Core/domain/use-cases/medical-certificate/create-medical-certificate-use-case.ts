import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'
import { MedicalCertificateMongooseRepository } from '../../repositories'

@injectable()
@registry([{ token: CreateMedicalCertificateUseCase, useClass: CreateMedicalCertificateUseCase }])
export class CreateMedicalCertificateUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		@inject(MedicalCertificateMongooseRepository) private readonly manager: MedicalCertificateManagerInterface
	) { }

	public async execute(
		medicalCertificate: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificateOrErr =
			await this.manager.create(
				medicalCertificate,
			)

		return medicalCertificateOrErr
	}
}
