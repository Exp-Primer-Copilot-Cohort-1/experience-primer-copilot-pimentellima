import { faker } from '@faker-js/faker'
import { AbstractError } from 'App/Core/errors/error.interface'
import { left, right } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { describe, expect, it, vi } from 'vitest'
import { PartnerManagerInterface } from '../../repositories/interface'
import {
	CreatePartnersUseCase,
	DeletePartnerByIdUseCase,
	FindPartnersByNameUseCase,
	FindPartnersByUnityUseCase,
	UpdatePartnersByIdUseCase
} from './index'

const account: IAccount = {
	name: 'DR. PERFORMANCE PITANGA',
	cash: 0,
	date: faker.date.recent(),
	bank: 'SANTANDER',
	active: true,
	unity_id: '63528c11c109b232759921d1',
}


const PartnerManager: PartnerManagerInterface = {
	create: vi.fn(async (account) => {
		return right(account as IAccount) as any
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
	update: vi.fn(async (_id, account) => {
		return right(account) as any
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

describe('Use cases ref partner (Only)', () => {
	it('should create account', async () => {
		const { sut } = makeSutCreate()
		const respOrErr = await sut.execute(account)
		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should find all accounts', async () => {
		const { sut } = makeSutFindAll()
		const respOrErr = await sut.execute({ unity_id: 'unity_id' })
		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should delete account by id', async () => {
		const { sut } = makeSutDelete()
		const respOrErr = await sut.execute({ id: '123' })
		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should update account', async () => {
		const { sut } = makeSutUpdate()
		const respOrErr = await sut.execute({ id: '123', ...account })
		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should return error when create account', async () => {
		const { sut } = makeSutCreate()
		vi.spyOn(PartnerManager, 'create').mockImplementationOnce(async () => {
			return left(undefined) as any
		})
		const respOrErr = await sut.execute(account)
		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should return error when find all accounts', async () => {
		const { sut } = makeSutFindAll()

		vi.spyOn(PartnerManager, 'findAll').mockImplementationOnce(async () => {
			return left(undefined) as any
		})

		const respOrErr = await sut.execute({ unity_id: 'unity-invalid' })

		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should return error when delete account by id', async () => {
		const { sut } = makeSutDelete()
		vi.spyOn(PartnerManager, 'deleteByID').mockImplementationOnce(async () => {
			return left(undefined) as any
		})
		const respOrErr = await sut.execute({ id: 'id-invalid' })
		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should return error when update account', async () => {
		const { sut } = makeSutUpdate()
		vi.spyOn(PartnerManager, 'update').mockImplementationOnce(async () => {
			return left(undefined) as any
		})
		const respOrErr = await sut.execute({ id: 'id-invalid', ...account })
		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should return error when find all categories with unity_id invalid', async () => {
		const { sut } = makeSutFindAll()

		const respOrErr = await sut.execute({ unity_id: null as any })

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(AbstractError)
	})

	it('should return error when update account with id invalid', async () => {
		const { sut } = makeSutUpdate()
		const respOrErr = await sut.execute({ id: null as any, ...account })
		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should return error when delete account with id invalid', async () => {
		const { sut } = makeSutDelete()
		const respOrErr = await sut.execute({ id: null as any })
		expect(respOrErr.isLeft()).toBeTruthy()
	})
})
