import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { CreateMedicalCertificateUseCase } from 'App/Core/domain/use-cases'

export const makeMedicalCertificateCreateComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateMedicalCertificateUseCase(new MedicalCertificateMongooseRepository()),
	)
}
