import { left, right } from 'App/Core/shared'
import { IPartner } from 'App/Types/IPartner'
import { describe, expect, it, vi } from 'vitest'
import { PartnerManagerInterface } from '../../repositories/interface'
import {
	CreatePartnersUseCase,
	DeletePartnerByIdUseCase,
	FindPartnersByNameUseCase,
	FindPartnersByUnityUseCase,
	UpdatePartnersByIdUseCase
} from './index'

const partner: IPartner = {
	name: 'DR. PERFORMANCE PITANGA',
	active: true,
	unity_id: '63528c11c109b232759921d1',
}


const PartnerManager: PartnerManagerInterface = {
	create: vi.fn(async (partner) => {
		return right(partner as IPartner) as any
	}),
	findAll: vi.fn(async () => {
		return right([]) as any
	}),
	deleteByID: vi.fn(async (id) => {
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
	const sut = new CreatePartnersUseCase(PartnerManager)
	return { sut, }
}

const makeSutFindAll = () => {
	const sut = new FindPartnersByUnityUseCase(PartnerManager)
	return { sut, }
}

const makeSutDelete = () => {
	const sut = new DeletePartnerByIdUseCase(PartnerManager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new FindPartnersByNameUseCase(PartnerManager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdatePartnersByIdUseCase(PartnerManager)
	return { sut, }
}

describe('Use cases ref partner (Unit)', () => {

	describe('Create partner Use Case', () => {

		it('should create partner', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(partner)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create partner', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(PartnerManager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(partner)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find all partner Use Case', () => {

		it('should find all partners', async () => {
			const { sut } = makeSutFindAll()
			const respOrErr = await sut.execute({ unity_id: 'unity_id' })
			expect(respOrErr.isRight()).toBeTruthy()
		})
		it('should return error when find all partners', async () => {
			const { sut } = makeSutFindAll()

			vi.spyOn(PartnerManager, 'findAll').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ unity_id: 'unity-invalid' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find partner by name Use Case', () => {

		it('should find partner by name', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ name: 'name', unity_id: 'unity_id' })
			expect(respOrErr.isRight()).toBeTruthy()
		})
		it('should return error when find partner by name', async () => {
			const { sut } = makeSutFindById()

			vi.spyOn(PartnerManager, 'findByName').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ name: 'name', unity_id: 'unity-invalid' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Delete partner by id Use Case', () => {

		it('should delete partner by id', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: '123' })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when delete partner by id', async () => {
			const { sut } = makeSutDelete()
			vi.spyOn(PartnerManager, 'deleteByID').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ id: 'id-invalid' })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when delete partner with id invalid', async () => {
			const { sut } = makeSutDelete()
			const respOrErr = await sut.execute({ id: null as any })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

	})

	describe('Update partner by id Use Case', () => {

		it('should update partner', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: '123', ...partner })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update partner', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(PartnerManager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ _id: 'id-invalid', ...partner })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update partner with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ _id: null as any, ...partner })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
