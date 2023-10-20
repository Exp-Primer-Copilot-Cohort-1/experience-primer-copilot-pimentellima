import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { inject, injectable, registry } from 'tsyringe'
import { MedicalCertificateMongooseRepository } from '../../repositories'

type Input = {
	id: string
}

@injectable()
@registry([{ token: ShowMedicalCertificateByIdUseCase, useClass: ShowMedicalCertificateByIdUseCase }])
export class ShowMedicalCertificateByIdUseCase implements UseCase<Input, IMedicalCertificate> {
	constructor(@inject(MedicalCertificateMongooseRepository) private readonly manager: MedicalCertificateManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, IMedicalCertificate> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const medicalCertificateOrErr = await this.manager.findById(input.id)

		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return medicalCertificateOrErr
	}
}
