import { describe, expect, it } from 'vitest'

import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { MedicalCertificateInMemoryRepository } from 'App/Core/domain/repositories'
import { DeleteMedicalCertificateByIdUseCase } from './delete-medical-certificate-by-id-use-case'

const makeSut = () => {
	const sut = new DeleteMedicalCertificateByIdUseCase(
		new MedicalCertificateInMemoryRepository(),
	)

	return { sut }
}

describe('DeleteMedicalCertificateByIdUseCase (Unit)', () => {
	it('should return is left if name is not provided', async () => {
		const { sut } = makeSut()
		const input = { _id: ' ' }
		const medicalCertificateOrErr = await sut.execute(input as any)

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute({})

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})
	it('should return is left if is null', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute(null as any)

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnitNotFoundError if left', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute({ id: 'id_inexistente' })

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
		expect(medicalCertificateOrErr.extract()).toBeInstanceOf(UnitNotFoundError)
	})
})
