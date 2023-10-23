import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'

export interface MedicalCertificateManagerContract {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IMedicalCertificate[]>
	findById: (id: string) => PromiseEither<AbstractError, IMedicalCertificate>
	deleteById: (
		id: string,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	update: (
		id: string,
		data: Partial<IMedicalCertificate>,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	updateMedicalCertificateActive: (
		id: string,
		active: boolean,
	) => PromiseEither<AbstractError, IMedicalCertificate>
	create: (
		data: Partial<IMedicalCertificate>,
	) => PromiseEither<AbstractError, IMedicalCertificate>
}
