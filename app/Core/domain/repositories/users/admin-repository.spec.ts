import AdminUser from 'App/Core/domain/entities/user/admin'
import { ROLES } from 'App/Roles/types'
import { IAdminUser } from 'App/Types/IAdminUser'
import { SessionTransactionMock } from '__mocks__'
import { Model } from '__mocks__/model'
import { cpf } from 'cpf-cnpj-validator'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { AdminMongooseRepository } from './admin-mongo-repository'
const makeSut = () => {
	const sut = new AdminMongooseRepository(new SessionTransactionMock())

	return {
		sut,
	}
}

const user: IAdminUser = {
	unity_id: '63528c11c109b232759921d1',
	name: 'Murilo dos Anjos Montino',
	date_expiration: '2021-01-01',
	password: '123456',
	email: 'murilomontinojr2@hotmail.com',
	document: cpf.generate(),
	celphone: '(00) 00000-0000',
	type: ROLES.ADMIN_PROF,
	_id: '',
	active: true,

}

describe.skip('Users Mongo Repository (Unit)', () => {
	beforeAll(async () => {
		vi.mock('App/Models/User', () => ({
			__esModule: true,
			default: Model,
		}))
	})

	afterAll(async () => {
		vi.resetAllMocks()
	})

	it('should call AdminMongo.create', async () => {
		const { sut } = makeSut()
		const entityOrErr = await AdminUser.build(user)

		if (entityOrErr.isLeft()) {
			throw new Error('Error')
		}

		const entity = entityOrErr.extract()

		const resultOrErr = await sut.create(entity)

		expect(resultOrErr.isRight()).toBeTruthy()

		if (resultOrErr.isLeft()) {
			throw new Error('Error')
		}

		expect(resultOrErr.extract()._id).toBeDefined()
	})
})
