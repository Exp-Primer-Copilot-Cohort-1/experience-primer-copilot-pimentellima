import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { MedicalCertificateMongooseRepository } from 'App/Core/domain/repositories'
import { DeleteMedicalCertificateByIdUseCase } from 'App/Core/domain/use-cases'

export const makeMedicalCertificateDeleteByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteMedicalCertificateByIdUseCase(
			new MedicalCertificateMongooseRepository(),
		),
	)
}
