import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { FindMedicalCertificateByNameUseCase } from 'App/Core/domain/use-cases'

export const makeMedicalCertificateFindByNameComposer = (): ControllerGeneric => {
	return new Controller(
		new FindMedicalCertificateByNameUseCase(
			new MedicalCertificateMongooseRepository(),
		),
	)
}
