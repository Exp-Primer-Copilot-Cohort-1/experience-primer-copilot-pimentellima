import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import deepCompare from './deep-compare'

const before = {
	name: 'John',
	age: 20,
	address: {
		street: 'Main Street',
		number: 123,
	},
}

const after = {
	name: 'John',
	age: 21,
	address: {
		street: 'Main Street',
		number: 123,
	},
}

const random = ({
	name = faker.person.firstName(),
	age = faker.number.int({ min: 18, max: 60 }),
	address: {
		street = faker.location.street(),
		number = faker.number.int({ min: 0, max: 9999 }),
	},
	...rest
}) => ({
	name,
	age,
	address: {
		street,
		number,
	},
	...rest,
})

describe('Deep Compare (Only)', () => {
	it('should compare objects', () => {
		expect(deepCompare(before, after)).toEqual([{ age: 20 }, { age: 21 }])
	})

	it('should compare objects with random values', () => {
		const before = random({ address: {} })
		const after = random({ address: {} })
		const [original, modified] = deepCompare(before, after)
		expect(original).toEqual(before)
		expect(modified).toEqual(after)
		expect(deepCompare(before, after)).toEqual([before, after])
	})

	it('should compare objects with name and age', () => {
		const before = random({
			name: 'John',
			age: 20,
			address: {}
		})
		const after = random({
			name: 'John',
			age: 20,
			address: {}
		})
		const [original, modified] = deepCompare(before, after)
		expect(original).toEqual({ address: before.address })
		expect(modified).toEqual({ address: after.address })
	})

	it('should compare objects with name and age and address', () => {
		const before = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
		})
		const after = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
		})
		const [original, modified] = deepCompare(before, after)
		expect(original).toEqual({})
		expect(modified).toEqual({})
	})

	it('should compare objects with random values plus name and age and address', () => {
		const before = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
		})
		const after = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
			mother: 'Mary',
		})
		const [original, modified] = deepCompare(before, after)
		expect(original).toEqual({})
		expect(modified).toEqual({ mother: 'Mary', })
	})

	it('should compare objects with random values plus name and age and address and mother', () => {
		const before = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
			mother: 'Mary',
		})
		const after = random({
			name: 'John',
			age: 20,
			address: {
				street: 'Main Street',
				number: 123,
			},
		})
		const [original, modified] = deepCompare(before, after)
		expect(original).toEqual({ mother: 'Mary', })
		expect(modified).toEqual({})
	})
})
