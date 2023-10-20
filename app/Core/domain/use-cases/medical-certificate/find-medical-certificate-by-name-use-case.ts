import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { inject, injectable, registry } from 'tsyringe'
import { MedicalCertificateMongooseRepository } from '../../repositories'

type FindAllProps = {
	name?: string
	unity_id: string
}
@injectable()
@registry([{ token: FindMedicalCertificateByNameUseCase, useClass: FindMedicalCertificateByNameUseCase }])

export class FindMedicalCertificateByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(@inject(MedicalCertificateMongooseRepository) private readonly manager: MedicalCertificateManagerInterface) { }

	public async execute(input: FindAllProps): PromiseEither<AbstractError, any[]> {

		const medicalCertificateOrErr = await this.manager.findByName(
			input.name || '',
			input.unity_id,
		)
		if (medicalCertificateOrErr.isLeft()) {
			return left(medicalCertificateOrErr.extract())
		}

		return right(medicalCertificateOrErr.extract())
	}
}
