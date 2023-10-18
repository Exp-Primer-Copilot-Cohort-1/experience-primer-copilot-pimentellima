import { describe, expect, it, vi } from 'vitest'

import { faker } from '@faker-js/faker'
import { DrPerformanceInMemory } from 'App/Core/domain/repositories/dr_performance/dr-performance.in-memory.repository'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'App/Types/IAdminUser'
import { IUnity } from 'App/Types/IUnity'
import { Model } from '__mocks__/model'
import { cpf } from 'cpf-cnpj-validator'

const user: IAdminUser = {
	unity_id: '63528c11c109b232759921d1',
	name: faker.person.fullName(),
	date_expiration: '2021-01-01',
	password: faker.internet.password(),
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number(),
	type: ROLES.ADMIN_PROF,
	_id: '123213',
	active: false,
	avatar: '',
	created_at: new Date(),
	updated_at: new Date(),
}

const unity: IUnity = {
	_id: '63528c11c109b232759921d1',
	name: 'Aparecida',
	active: true,
	document: cpf.generate(),
	email: faker.internet.email(),
	franchised: false
}

vi.mock('App/Models/BusinessFranchises', () => ({
	__esModule: false,
	default: Model,
}))
vi.mock('App/Models/Unity', () => ({
	__esModule: false,
	default: Model,
}))

import { UnityNotFoundError } from 'App/Core/domain/errors'
import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { CreateFranchiseDrPerformanceUseCase } from './create-user-dr-performance-use-case'

const makeSut = () => {
	const sut = new CreateFranchiseDrPerformanceUseCase(
		new DrPerformanceInMemory()
	)

	return {
		sut,
	}
}
describe('Create User Dr Performance Use Case (Unit)', () => {
	it('should return right with user created', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({
			admin: user,
			unity: unity,
			franchised: false
		})

		expect(userOrErr.isRight()).toBeTruthy()
		expect(userOrErr.extract()).toEqual({ message: 'not franchised' })
	})

	it('should return left with user._id not provided', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({
			admin: {
				...user,
				_id: null as any,
			},
			unity: unity,
			franchised: false
		})

		expect(userOrErr.isLeft()).toBeTruthy()
		expect(userOrErr.extract()).toBeInstanceOf(IdNotProvidedError)
	})

	it('should return left with unity._id not provided', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({
			admin: user,
			unity: {
				...unity,
				_id: null as any,
			},
			franchised: false
		})

		expect(userOrErr.isLeft()).toBeTruthy()
		expect(userOrErr.extract()).toBeInstanceOf(UnityNotFoundError)
	})

	it('should return right with id ', async () => {
		const { sut } = makeSut()

		const userOrErr = await sut.execute({
			admin: user,
			unity: unity,
			franchised: true
		})

		expect(userOrErr.isRight()).toBeTruthy()
		expect(userOrErr.extract()).toEqual({ message: 'ok' })
	})
})
