import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { UpdateMedicalCertificateByIdUseCase } from 'App/Core/domain/use-cases'

export const makeMedicalCertificateUpdateByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateMedicalCertificateByIdUseCase(
			new MedicalCertificateMongooseRepository(),
		),
	)
}
