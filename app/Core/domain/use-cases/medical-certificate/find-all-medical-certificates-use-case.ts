import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { MedicalCertificateManagerContract } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([
	{ token: FindAllMedicalCertificatesUseCase, useClass: FindAllMedicalCertificatesUseCase },
])
export class FindAllMedicalCertificatesUseCase
	implements UseCase<{ unity_id: string }, IMedicalCertificate[]>
{
	constructor(
		@inject(MedicalCertificateMongooseRepository)
		private readonly manager: MedicalCertificateManagerContract,
	) {}

	public async execute({
		unity_id,
	}: {
		unity_id: string
	}): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificateOrErr = await this.manager.findAll(unity_id)

		return medicalCertificateOrErr
	}
}
