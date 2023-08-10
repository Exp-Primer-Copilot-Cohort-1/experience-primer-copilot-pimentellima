import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import MedicalCertificate from 'App/Models/MedicalCertificate'
import { IMedicalCertificate } from 'Types/IMedicalCertificate'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { MedicalCertificateManagerInterface } from '../interface'

export class MedicalCertificateMongooseRepository
	implements MedicalCertificateManagerInterface {
	constructor() { }

	async updateMedicalCertificateActive(
		id: string,
		active: boolean,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findByIdAndUpdate(
			id,
			{
				$set: { active },
			},
			{ new: true },
		)
		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		return right(medicalCertificate)
	}

	async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = await MedicalCertificate.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: true,
			unity_id,
		})

		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		return right(medicalCertificate)
	}
	async findByNameInatives(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = await MedicalCertificate.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: false,
			unity_id,
		})

		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		return right(medicalCertificate)
	}
	async findById(id: string): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findById(id)
		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		return right(medicalCertificate)
	}
	public async createMedicalCertificate(
		data: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.create({
			...data,
			active: true,
		})

		return right(medicalCertificate)
	}
	public async updateMedicalCertificateById(
		id: string,
		data: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findByIdAndUpdate(id, data, {
			new: true,
		})
		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		return right(medicalCertificate)
	}
	public async deleteMedicalCertificateById(
		id: string,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findById(id)
		if (!medicalCertificate) {
			return left(new UnitNotFoundError())
		}
		await medicalCertificate.remove()
		return right(medicalCertificate)
	}
}
