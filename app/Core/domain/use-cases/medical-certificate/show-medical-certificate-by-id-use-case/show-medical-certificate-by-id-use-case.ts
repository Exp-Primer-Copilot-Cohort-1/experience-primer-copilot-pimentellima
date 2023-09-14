import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

type Input = {
	id: string
}

export class ShowMedicalCertificateByIdUseCase implements UseCase<Input, IMedicalCertificate> {
	constructor(private readonly medicalCertificateManager: MedicalCertificateManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, IMedicalCertificate> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const medicalCertificateOrErr = await this.medicalCertificateManager.findById(input.id)

		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return medicalCertificateOrErr
	}
}
