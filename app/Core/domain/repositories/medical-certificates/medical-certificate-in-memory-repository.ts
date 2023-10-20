import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { MedicalCertificateManagerInterface } from '../interface'

export class MedicalCertificateInMemoryRepository
	implements MedicalCertificateManagerInterface {
	public items: IMedicalCertificate[] = []

	constructor() { }
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = this.items.filter(
			(item) => item.name === name && item.unity_id.toString() === unity_id,
		)

		if (medicalCertificate.length === 0) {
			return left(new UnityNotFoundError())
		}

		return right(this.items)
	}
	public async findById(
		id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = this.items.find((item) => item._id.toString() === id)

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}

		return right(this.items)
	}
	public async deleteMedicalCertificateById(
		id: string,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = this.items.find((item) => item._id.toString() === id)

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}

		return right(medicalCertificate)
	}
	public async updateMedicalCertificateById(
		id: string,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = this.items.find((item) => item._id.toString() === id)

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}

		return right(medicalCertificate)
	}
}
