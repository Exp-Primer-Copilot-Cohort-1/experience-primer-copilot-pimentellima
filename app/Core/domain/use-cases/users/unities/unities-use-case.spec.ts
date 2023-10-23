import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { left, right } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { cnpj } from 'cpf-cnpj-validator'
import { describe, expect, it, vi } from 'vitest'
import {
	CreateUnityUseCase,
	DeleteUnitiesByIdUseCase,
	FindAllUnitiesUseCase,
	FindAllUnityByNameUseCase,
	UpdateUnitiesByIdUseCase
} from './index'

const unity: IUnity = {
	name: 'DR. PERFORMANCE PITANGA',
	_id: '63528c11c109b232759921d1',
	active: true,
	franchised: true,
	is_company: false,
	document: cnpj.generate(),
	phones: [
		{
			value: "79999999999", // Deve ser uma string
			id: 1,               // Deve ser um número
		}
		// Outros objetos de telefone, se necessário
	], cep: '49100-000',
	neighborhood: 'Bairro',
	address_number: '123',
	complement: 'Complemento',
	city: 'Cidade',
	state: 'Sergipe',
	country: 'Brasil',
	obs: 'Observação',
	email: 'test@hotmail.com',

}


const UnityManager: UnitiesManagerContract = {
	create: vi.fn(async (unity) => {
		return right(unity as IUnity) as any
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
	update: vi.fn(async (_id, unity) => {
		return right(unity) as any
	}),
	findById: vi.fn(async (_id) => {
		return right(unity) as any
	}),
	findOne: vi.fn(async (_id) => {
		return right(unity) as any
	}),
}

const makeSutCreate = () => {
	const sut = new CreateUnityUseCase(UnityManager)
	return { sut, }
}

const makeSutFindAll = () => {
	const sut = new FindAllUnitiesUseCase(UnityManager)
	return { sut, }
}

const makeSutDelete = () => {
	const sut = new DeleteUnitiesByIdUseCase(UnityManager)
	return { sut, }
}

const makeSutFindById = () => {
	const sut = new FindAllUnityByNameUseCase(UnityManager)
	return { sut, }
}

const makeSutUpdate = () => {
	const sut = new UpdateUnitiesByIdUseCase(UnityManager)
	return { sut, }
}

describe('Use cases ref unities (Unit)', () => {

	describe('Create unities Use Case', () => {

		it('should create unities', async () => {
			const { sut } = makeSutCreate()
			const respOrErr = await sut.execute(unity)
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when create unities', async () => {
			const { sut } = makeSutCreate()
			vi.spyOn(UnityManager, 'create').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute(unity)
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

	describe('Find all unities Use Case', () => {

		it('should find all unities', async () => {
			const { sut } = makeSutFindAll()
			const respOrErr = await sut.execute()
			expect(respOrErr.isRight()).toBeTruthy()
		})
	})

	describe('Find unities by name Use Case', () => {

		it('should find unities by name', async () => {
			const { sut } = makeSutFindById()
			const respOrErr = await sut.execute({ name: 'name' })
			expect(respOrErr.isRight()).toBeTruthy()
		})
		it('should return error when find unities by name', async () => {
			const { sut } = makeSutFindById()

			vi.spyOn(UnityManager, 'findByName').mockImplementationOnce(async () => {
				return left(undefined) as any
			})

			const respOrErr = await sut.execute({ name: 'name' })

			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})



	describe('Update unities by id Use Case', () => {

		it('should update unities', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ ...unity })
			expect(respOrErr.isRight()).toBeTruthy()
		})

		it('should return error when update unities', async () => {
			const { sut } = makeSutUpdate()
			vi.spyOn(UnityManager, 'update').mockImplementationOnce(async () => {
				return left(undefined) as any
			})
			const respOrErr = await sut.execute({ ...unity })
			expect(respOrErr.isLeft()).toBeTruthy()
		})

		it('should return error when update unities with id invalid', async () => {
			const { sut } = makeSutUpdate()
			const respOrErr = await sut.execute({ ...unity, _id: null as any, })
			expect(respOrErr.isLeft()).toBeTruthy()
		})
	})

})
