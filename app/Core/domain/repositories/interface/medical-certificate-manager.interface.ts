import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

export interface MedicalCertificateManagerInterface {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IMedicalCertificate[]>
	findById: (id: string) => PromiseEither<AbstractError, IMedicalCertificate>
	deleteMedicalCertificateById: (
		id: string,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	updateMedicalCertificateById: (
		id: string,
		data: Partial<IMedicalCertificate>,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	updateMedicalCertificateActive: (
		id: string,
		active: boolean,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	createMedicalCertificate: (
		data: Partial<IMedicalCertificate>,
	) => PromiseEither<AbstractError, IMedicalCertificate>
}
