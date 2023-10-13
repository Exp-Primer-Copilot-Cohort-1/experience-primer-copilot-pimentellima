import { describe, expect, it } from 'vitest'

import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { MedicalCertificateInMemoryRepository } from 'App/Core/domain/repositories'
import { FindMedicalCertificateByNameUseCase } from './find-medical-certificate-by-name-use-case'

const makeSut = () => {
	const sut = new FindMedicalCertificateByNameUseCase(
		new MedicalCertificateInMemoryRepository(),
	)

	return { sut }
}

describe('FindMedicalCertificateByNameUseCase (Unit)', () => {
	it('should return is left if name is not provided', async () => {
		const { sut } = makeSut()
		const input = { unity_id: 'não_existe' }
		const medicalCertificateOrErr = await sut.execute(input as any)

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})

	it('should return is left', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute({})

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})
	it.skip('should return is left if is null', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute(null as any)

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
	})
	it('should return UnityNotFoundError if left', async () => {
		const { sut } = makeSut()
		const medicalCertificateOrErr = await sut.execute({ name: 'inexistente' })

		expect(medicalCertificateOrErr.isLeft()).toBeTruthy()
		expect(medicalCertificateOrErr.extract()).toBeInstanceOf(UnityNotFoundError)
	})
})
