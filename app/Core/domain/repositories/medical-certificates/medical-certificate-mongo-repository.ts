import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import MedicalCertificate from 'App/Models/MedicalCertificate'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { MedicalCertificateManagerInterface } from '../interface'

export class MedicalCertificateMongooseRepository
	// eslint-disable-next-line prettier/prettier
	implements MedicalCertificateManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
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
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}

		return right(medicalCertificate as unknown as IMedicalCertificate)
	}

	async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = await MedicalCertificate.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: true,
			unity_id,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}
		return right(medicalCertificate as unknown as IMedicalCertificate[])
	}
	async findByNameInatives(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IMedicalCertificate[]> {
		const medicalCertificate = await MedicalCertificate.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			active: false,
			unity_id,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}
		return right(medicalCertificate as unknown as IMedicalCertificate[])
	}
	async findById(id: string): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findById(id).populate(
			'prof',
			{ label: '$name', value: '$_id', _id: 0 },
		)
		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}
		return right(medicalCertificate as unknown as IMedicalCertificate)
	}
	public async createMedicalCertificate(
		data: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.create({
			...data,
			prof: data.prof?.value,
			active: true,
		})

		return right(
			await medicalCertificate.populate('prof', {
				label: '$name',
				value: '$_id',
				_id: 0,
			}),
		)
	}
	public async updateMedicalCertificateById(
		id: string,
		data: Partial<IMedicalCertificate>,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findByIdAndUpdate(id, data, {
			new: true,
		}).populate('prof', { label: '$name', value: '$_id', _id: 0 })
		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}
		return right(medicalCertificate as unknown as IMedicalCertificate)
	}
	public async deleteMedicalCertificateById(
		id: string,
	): PromiseEither<AbstractError, IMedicalCertificate> {
		const medicalCertificate = await MedicalCertificate.findById(id)
		if (!medicalCertificate) {
			return left(new UnityNotFoundError())
		}
		await medicalCertificate.deleteOne()
		return right(medicalCertificate as unknown as IMedicalCertificate)
	}
}
