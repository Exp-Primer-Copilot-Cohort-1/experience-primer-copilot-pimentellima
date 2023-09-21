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

describe('Deep Compare (Unit)', () => {
	it('should compare objects', () => {
		console.log(deepCompare(before, after))
		expect(deepCompare(before, after)).toEqual([{ age: 20 }, { age: 21 }])
	})
})
