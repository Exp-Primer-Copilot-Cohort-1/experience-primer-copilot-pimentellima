import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CreateMedicalCertificateUseCase, FindMedicalCertificateByNameUseCase, ShowMedicalCertificateByIdUseCase, UpdateMedicalCertificateByIdUseCase } from 'App/Core/domain/use-cases'

// export const makeMedicalCertificateCreateComposer = (): ControllerGeneric => {
// 	return new Controller(
// 		new CreateMedicalCertificateUseCase(new MedicalCertificateMongooseRepository()),
// 	)
// }

export const makeMedicalCertificateCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateMedicalCertificateUseCase)
}

export const makeMedicalCertificateFindByNameComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindMedicalCertificateByNameUseCase)
}

export const makeMedicalCertificateShowByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(ShowMedicalCertificateByIdUseCase)
}

export const makeMedicalCertificateUpdateByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateMedicalCertificateByIdUseCase)
}