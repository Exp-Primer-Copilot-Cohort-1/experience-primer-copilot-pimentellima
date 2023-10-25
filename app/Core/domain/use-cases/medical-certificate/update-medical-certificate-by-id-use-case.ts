import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { MedicalCertificateManagerContract } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'


@injectable()
@registry([{ token: UpdateMedicalCertificateByIdUseCase, useClass: UpdateMedicalCertificateByIdUseCase }])
export class UpdateMedicalCertificateByIdUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		@inject(MedicalCertificateMongooseRepository) private readonly manager: MedicalCertificateManagerContract
	) { } // eslint-disable-line

	public async execute(
		medicalCertificate: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		if (!medicalCertificate?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const medicalCertificateOrErr =
			await this.manager.update(
				medicalCertificate._id.toString(),
				medicalCertificate,
			)

		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return medicalCertificateOrErr
	}
}
