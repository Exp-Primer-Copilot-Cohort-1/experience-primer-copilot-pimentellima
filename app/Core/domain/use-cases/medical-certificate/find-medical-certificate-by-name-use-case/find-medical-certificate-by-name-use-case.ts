import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { MedicalCertificateManagerInterface } from '../App/Core/domain/repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindMedicalCertificateByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(private readonly medicalCertificateManager: MedicalCertificateManagerInterface) { }

	public async execute(input: FindAllProps): PromiseEither<AbstractError, any[]> {

		const medicalCertificateOrErr = await this.medicalCertificateManager.findByName(
			input.name || '',
			input.unity_id,
		)
		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return right(medicalCertificateOrErr.extract())
	}
}
