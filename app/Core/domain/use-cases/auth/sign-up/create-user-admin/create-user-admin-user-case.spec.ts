import { beforeAll, describe, expect, it, vi } from 'vitest'
import { CreateUserAdminUseCase } from './create-user-admin-use-case'

import {
	AdminInMemoryRepository,
	UnitiesInMemoryRepository
} from 'App/Core/domain/repositories'
import { CreatePasswordUseCase } from '../create-password/create-password-use-case'

import { faker } from '@faker-js/faker'
import { DrPerformanceInMemory } from 'App/Core/domain/repositories/dr_performance/dr-performance.in-memory.repository'
import { EventEmitterTest } from 'App/Core/infra/event-emitter'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'App/Types/IAdminUser'
import { cpf } from 'cpf-cnpj-validator'
import { CreateUnityUseCase } from '../../../unities'
import { CreateFranchiseDrPerformanceUseCase } from '../create-user-dr-performance/create-user-dr-performance-use-case'
import { CreateUserUseCase } from '../create-user/create-user-use-case'

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
	const event = new EventEmitterTest()

	const sut = new CreateUserAdminUseCase(
		new CreateUserUseCase(
			new AdminInMemoryRepository(),
			new CreatePasswordUseCase(event),
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

describe('Create User Admin Use Case (Unit)', () => {
	beforeAll(() => {
		vi.mock('App/Mail/entity/mail', () => {
			return {
				__esModule: true,
				default: () => {
					return (target: any) => {
						// mock implementation here
					}
				},
			}
		})
	})

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
