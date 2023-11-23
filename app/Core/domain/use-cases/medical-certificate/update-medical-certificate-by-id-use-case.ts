import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { MedicalCertificateManagerContract } from 'App/Core/domain/repositories/interface'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([
	{
		token: UpdateMedicalCertificateByIdUseCase,
		useClass: UpdateMedicalCertificateByIdUseCase,
	},
])
export class UpdateMedicalCertificateByIdUseCase
	implements UseCase<Partial<IMedicalCertificate>, IMedicalCertificate>
{
	constructor(
		@inject(MedicalCertificateMongooseRepository)
		private readonly manager: MedicalCertificateManagerContract,
	) {} // eslint-disable-line

	public async execute({
		id,
		prof,
		...medicalCertificate
	}: Partial<IMedicalCertificate>): PromiseEither<AbstractError, IMedicalCertificate> {
		try {
			if (!id) {
				return left(new MissingParamsError('id is required'))
			}
			return await this.manager.update(
				id.toString(),
				medicalCertificate,
			)

			
		} catch (e) {
			console.log(e)
		}
	}
}
