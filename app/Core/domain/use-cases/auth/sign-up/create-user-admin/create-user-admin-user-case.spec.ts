import { describe, expect, it } from 'vitest'
import { CreateUserAdminUseCase } from './create-user-admin-use-case'

import {
	AdminInMemoryRepository,
	UnitiesInMemoryRepository
} from 'App/Core/domain/repositories'

import { faker } from '@faker-js/faker'
import { DrPerformanceInMemory } from 'App/Core/domain/repositories/dr_performance/dr-performance.in-memory.repository'
import { CreateUnityUseCase } from 'App/Core/domain/use-cases'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'App/Types/IAdminUser'
import { EventEmitterMock } from '__mocks__'
import { cpf } from 'cpf-cnpj-validator'
import { CreateFranchiseDrPerformanceUseCase } from '../create-user-dr-performance/create-user-dr-performance-use-case'
import { CreateUserSimplifiedUseCase } from '../create-user-simplyfield/create-user-simplyfield-use-case'

const user: IAdminUser = {
	unity_id: '63528c11c109b232759921d1',
	name: faker.person.fullName(),
	date_expiration: faker.date.future().toISOString(),
	password: faker.internet.password(),
	email: faker.internet.email(),
	document: cpf.generate(),
	celphone: faker.phone.number(),
	type: ROLES.ADMIN_PROF,
	_id: '',
	active: false,
	avatar: '',
	created_at: new Date(),
	updated_at: new Date(),
}

const makeSut = () => {
	const session = new SessionTransaction()
	const event = new EventEmitterMock()

	const sut = new CreateUserAdminUseCase(
		new CreateUserSimplifiedUseCase(
			new AdminInMemoryRepository(),
		),
		new CreateUnityUseCase(new UnitiesInMemoryRepository()),
		new CreateFranchiseDrPerformanceUseCase(new DrPerformanceInMemory()),
		session,
		event
	)

	return {
		sut,
	}
}

describe.skip('Create User Admin Use Case (Unit)', () => {

	it('should return right with user created', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute(user)
		expect(userOrErr.isRight()).toBeTruthy()
	})

	it('should return left with error when user already exists', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute(user)

		expect(userOrErr.isRight()).toBeTruthy()

		const user2OrErr = await sut.execute(user)
		expect(user2OrErr.isLeft()).toBeTruthy()
	})

	it('should return right with user created if not passed password', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({ ...user, password: '' })
		expect(userOrErr.isRight()).toBeTruthy()
		if (userOrErr.isLeft()) {
			throw new Error('User not created')
		}

		expect(userOrErr.extract().password).toBeDefined()
	})
})
