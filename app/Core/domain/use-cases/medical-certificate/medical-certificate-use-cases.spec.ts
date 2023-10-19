import { MedicalCertificateManagerInterface } from 'App/Core/domain/repositories/interface'
import { left, right } from 'App/Core/shared'
import { IMedicalCertificate } from 'App/Types/IMedicalCertificate'
import { IPartner } from 'App/Types/IPartner'
import { describe, expect, it, vi } from 'vitest'
import {
	CreateMedicalCertificateUseCase,
	DeleteMedicalCertificateByIdUseCase,
	FindMedicalCertificateByNameUseCase,
	UpdateMedicalCertificateByIdUseCase
} from './index'

const medicalCertificate: Partial<IMedicalCertificate> = {
	name: 'DR. PERFORMANCE PITANGA',
	active: true,
	prof: {
		value: '63528c11c109b232759921d2',
		label: '123456',
	},
	description: 'teste medicalCertificate'
}


const MedicalCertificateManager: MedicalCertificateManagerInterface = {
	create: vi.fn(async (partner) => {
		return right(partner as IPartner) as any
	}),
	findAll: vi.fn(async () => {
		return right([]) as any
	}),
	deleteById: vi.fn(async (id) => {
		return right(id) as any
	}),
	findByName: vi.fn(async (id) => {
		return right(id) as any
	}),
	update: vi.fn(async (_id, partner) => {
		return right(partner) as any
	})
}

const makeSutCreate = () => {
	const sut = new CreateMedicalCertificateUseCase(MedicalCertificateManager)
	return { sut, }
}


const makeSutDelete = () => {
	const sut = new DeleteMedicalCertificateByIdUseCase(MedicalCertificateManager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new FindMedicalCertificateByNameUseCase(MedicalCertificateManager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateMedicalCertificateByIdUseCase(MedicalCertificateManager)
	return { sut, }
}

describe('Use cases ref Medical Certificate (Only)', () => {

	describe('Create partner Use Case', () => {

		it('should create Medical Certificate', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(medicalCertificate)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create Medical Certificate', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(MedicalCertificateManager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(medicalCertificate)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find Medical Certificate by name Use Case', () => {

		it('should find Medical Certificate by name', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ name: 'name', unity_id: 'unity_id' })
			expect(respOrErr.isRight()).toBeTruthy()
		})
		it('should return error when find Medical Certificate by name', async () => {
			const { sut } = makeSutFindById()

			vi.spyOn(MedicalCertificateManager, 'findByName').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ name: 'name', unity_id: 'unity-invalid' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Delete Medical Certificate by id Use Case', () => {

		it('should delete Medical Certificate by id', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when delete Medical Certificate by id', async () => {
			const { sut } = makeSutDelete()
			vi.spyOn(MedicalCertificateManager, 'deleteById').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when delete Medical Certificate with id invalid', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: null as any })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update Medical Certificate by id Use Case', () => {

		it('should update Medical Certificate', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: '123', ...medicalCertificate })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update Medical Certificate', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(MedicalCertificateManager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ _id: 'id-invalid', ...medicalCertificate })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update Medical Certificate with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: null as any, ...medicalCertificate })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
