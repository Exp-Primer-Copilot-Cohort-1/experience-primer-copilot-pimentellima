import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { faker } from '@faker-js/faker'
import { UnityEntity } from './unity'

import { IUnity } from 'App/Types/IUnity'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { addDays } from 'date-fns'

const unity = {
	_id: faker.string.uuid(),
	created_at: faker.date.past(),
	name: faker.person.firstName(),
	email: faker.internet.email(),
	active: faker.datatype.boolean(),
	avatar: faker.image.avatar(),
	updated_at: faker.date.recent(),
	franchised: faker.datatype.boolean(),
	document: cpf.generate(),
	address: faker.location.street(),
	address_number: faker.number.int().toLocaleString(),
	cep: faker.location.zipCode(),
	city: faker.location.city(),
	cnaes: faker.lorem.paragraph(),
	complement: faker.lorem.paragraph(),
	country: faker.location.country(),
	date_expiration: faker.date.future(),
	holidays: [],
	is_company: faker.datatype.boolean(),
	name_company: faker.company.name(),
	neighborhood: faker.location.county(),
	obs: faker.lorem.paragraph(),
	phones: [],
	revenue_reports: {},
	site: faker.internet.url(),
	state: faker.location.state(),
} as IUnity

const minimumUnity = {
	_id: faker.string.uuid(),
	name: faker.person.firstName(),
	email: faker.internet.email(),
	active: faker.datatype.boolean(),
	document: cnpj.generate(),
} as IUnity

describe('Entity Unity (Unit)', () => {
	beforeEach(() => {
		// tell vitest we use mocked time
		vi.useFakeTimers()
	})

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers()
	})
	it('should be able to create a new unity', async () => {
		const unityOrErr = await UnityEntity.build(unity)
		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}
		expect(unityOrErr.extract()).toBeInstanceOf(UnityEntity)
	})

	it('should be able to create a new unity with params', async () => {
		const unityOrErr = await UnityEntity.build(unity)

		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}
	})

	it('should be invalid email when email is invalid', async () => {
		const unityOrErr = await UnityEntity.build(unity)

		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}

		const entity = unityOrErr.extract()

		expect(() => entity.defineEmail('invalid-email')).toThrow()
	})

	it('should be create a new unity with minimum params', async () => {
		const unityOrErr = await UnityEntity.build(minimumUnity)

		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}
	})

	it('should be equal unities', async () => {
		const unityOrErr = await UnityEntity.build(unity)

		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}

		const entity = unityOrErr.extract()

		expect(entity).toEqual(unity)
	})

	it('should be create date_expiration when date_expiration is null', async () => {
		const unityOrErr = await UnityEntity.build(minimumUnity)

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}

		const unity = unityOrErr.extract()

		expect(unity.date_expiration).toBeDefined()
	})

	it('should be create date_expiration 5 days when date_expiration is null', async () => {
		const now = new Date(2022, 1, 1, 13)
		vi.setSystemTime(now)

		const date = addDays(now, 5)

		const unityOrErr = await UnityEntity.build(minimumUnity)

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}

		const date_expiration = unityOrErr.extract().date_expiration as Date
		expect(date_expiration).toEqual(date)
	})
})

describe('Entity Unity (Integration)', () => {
	it('should be invalid document when cpf or cnpj is invalid', async () => {
		const unityOrErr = await UnityEntity.build(unity)

		expect(unityOrErr.isRight()).toBeTruthy()

		if (unityOrErr.isLeft()) {
			throw new Error('Unity is not valid')
		}

		const entity = unityOrErr.extract()

		expect(() => entity.defineDocument('invalid-email', true)).toThrow()
	})

	it('should be invalid create a new unity with minimum params but document invalid', async () => {
		const unityOrErr = await UnityEntity.build({
			...minimumUnity,
			document: 'invalid-document',
		})

		expect(unityOrErr.isLeft()).toBeTruthy()
	})
})
