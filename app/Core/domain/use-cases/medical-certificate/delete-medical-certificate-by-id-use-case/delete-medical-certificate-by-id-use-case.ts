import LogDecorator from 'App/Core/decorators/log-decorator'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

type Input = {
	id: string
}

export class DeleteMedicalCertificateByIdUseCase
	implements UseCase<Input, IMedicalCertificate>
{
	constructor(
		private readonly medicalCertificateManager: MedicalCertificateManagerInterface,
	) { }

	@LogDecorator('medical-certificates', 'delete')
	public async execute(
		input: Input,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const medicalCertificateErr =
			await this.medicalCertificateManager.deleteMedicalCertificateById(input.id)

		return medicalCertificateErr
	}
}
