import { beforeAll, describe, expect, it, vi } from 'vitest'
import { CreateUserUseCase } from './create-user-use-case'

import { AdminInMemoryRepository } from 'App/Core/domain/repositories'
import { CreatePasswordUseCase } from '../create-password/create-password-use-case'

import { faker } from '@faker-js/faker'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'App/Types/IAdminUser'
import { cpf } from 'cpf-cnpj-validator'

const user: IAdminUser = {
	unity_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	date_expiration: '2021-01-01',
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
	const sut = new CreateUserUseCase(
		new AdminInMemoryRepository(),
		new CreatePasswordUseCase(),
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

	it.skip('should return right with user created', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute(user)
		expect(userOrErr.isRight()).toBeTruthy()
	})

	it.skip('should return left with error when user already exists', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute(user)

		expect(userOrErr.isRight()).toBeTruthy()

		const user2OrErr = await sut.execute(user)
		expect(user2OrErr.isLeft()).toBeTruthy()
	})

	it.skip('should return right with user created if not passed password', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({ ...user, password: '' })
		expect(userOrErr.isRight()).toBeTruthy()
		if (userOrErr.isLeft()) {
			throw new Error('User not created')
		}

		expect(userOrErr.extract().password).toBeDefined()
	})

	it('should return left with error when unit not exists', async () => {
		const { sut } = makeSut()
		const userOrErr = await sut.execute({ ...user, unity_id: 'invalid_unity' })
		expect(userOrErr.isLeft()).toBeTruthy()
	})
})
