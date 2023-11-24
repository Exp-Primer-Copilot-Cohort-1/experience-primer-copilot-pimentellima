import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CreateMedicalCertificateUseCase, FindMedicalCertificateByNameUseCase, ShowMedicalCertificateByIdUseCase, UpdateMedicalCertificateByIdUseCase } from 'App/Core/domain/use-cases'
import { FindAllMedicalCertificatesUseCase } from 'App/Core/domain/use-cases/medical-certificate/find-all-medical-certificates-use-case'
import { IOptsQuery } from 'App/Types/IOptsQuery'

// export const makeMedicalCertificateCreateComposer = (): ControllerGeneric => {
// 	return new Controller(
// 		new CreateMedicalCertificateUseCase(new MedicalCertificateMongooseRepository()),
// 	)
// }

export const makeMedicalCertificateCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateMedicalCertificateUseCase)
}

export const makeMedicalCertificateFindAllComposer =  (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllMedicalCertificatesUseCase, opts)
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