import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { MedicalCertificateManagerContract } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateMedicalCertificateUseCase, useClass: CreateMedicalCertificateUseCase }])
export class CreateMedicalCertificateUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		@inject(MedicalCertificateMongooseRepository) private readonly manager: MedicalCertificateManagerContract
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
