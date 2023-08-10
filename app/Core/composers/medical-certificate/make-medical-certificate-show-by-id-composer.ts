import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { ShowMedicalCertificateByIdUseCase } from 'App/Core/domain/use-cases'

export const makeMedicalCertificateShowByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new ShowMedicalCertificateByIdUseCase(new MedicalCertificateMongooseRepository()),
	)
}
