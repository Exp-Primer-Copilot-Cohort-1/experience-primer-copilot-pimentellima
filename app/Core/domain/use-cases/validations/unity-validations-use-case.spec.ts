import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { faker } from '@faker-js/faker'
import { cnpj } from 'cpf-cnpj-validator'
import { UnitDateExpiredError } from '../../errors/unit-date-expired'
import { UnitiesInMemoryRepository } from '../../repositories'
import { UnityValidationUseCase } from './unity-validation-use-case'

const unit = {
	_id: '63528c11c109b232759921d1',
	name: faker.name.fullName(),
	active: faker.datatype.boolean(),
	created_at: faker.date.past(),
	avatar: faker.image.avatar(),
	city: faker.address.city(),
	address: faker.address.streetAddress(),
	address_number: faker.datatype.number().toString(),
	cep: faker.address.zipCode(),
	country: faker.address.country(),
	date_expiration: new Date(),
	is_company: faker.datatype.boolean(),
	email: faker.internet.email(),
	site: faker.internet.url(),
	state: faker.address.state(),
	updated_at: faker.date.past(),
	obs: faker.lorem.paragraph(),
	phone: faker.phone.number(),
	complement: faker.lorem.paragraph(),
	document: cnpj.generate(),
	name_company: faker.company.name(),
	neighbohood: faker.address.county(),
	cnaes: '',
	phones: [],
}

const makeSut = () => {
	const sut = new UnityValidationUseCase(new UnitiesInMemoryRepository())

	return { sut }
}

describe('Unity Validations (Unit)', () => {
	beforeEach(() => {
		// tell vitest we use mocked time
		vi.useFakeTimers()
	})

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers()
	})

	it('should be invalid when unity is null', async () => {
		const { sut } = makeSut()
		const respOrErr = await sut.execute(null as any)

		expect(respOrErr.isLeft()).toBeTruthy()
	})

	it('should be invalid when unity date expiration is less than now', async () => {
		const { sut } = makeSut()
		const date = new Date(3000, 1, 1, 13)
		vi.setSystemTime(date)

		const respOrErr = await sut.execute(unit)

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(UnitDateExpiredError)
	})

	it('should be valid when unity date expiration is greater than now', async () => {
		const { sut } = makeSut()

		const date = new Date(2000, 1, 1, 13)
		vi.setSystemTime(date)

		const respOrErr = await sut.execute(unit)

		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should be valid when unity date expiration is equal to now', async () => {
		const { sut } = makeSut()
		const date = new Date()

		vi.setSystemTime(date)

		const respOrErr = await sut.execute({
			...unit,
			date_expiration: date,
		})

		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should be invalid when unity date expiration is null', async () => {
		const { sut } = makeSut()

		const respOrErr = await sut.execute({
			...unit,
			date_expiration: null,
		})

		expect(respOrErr.isRight()).toBeTruthy()
	})

	it('should be invalid when unity not exists', async () => {
		const { sut } = makeSut()

		const respOrErr = await sut.execute({
			...unit,
			_id: '123',
		})

		expect(respOrErr.isLeft()).toBeTruthy()
	})
})
