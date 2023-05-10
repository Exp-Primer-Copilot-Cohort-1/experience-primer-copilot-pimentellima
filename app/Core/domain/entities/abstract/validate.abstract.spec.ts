import { describe, expect, it } from 'vitest'
import { Validate } from './validate.abstract'

class Generic extends Validate {
	private constructor(generic: string) {
		super(generic)
		this.validate(generic)
	}

	public validate(generic: string): this {
		if (!generic) {
			throw new Error('Generic is not valid')
		}
		return this
	}

	public static build(generic: string): Generic {
		return new Generic(generic)
	}
}

describe('Validate abstract (Unit)', () => {
	it('should return a string', () => {
		const generic = Generic.build('generic')
		expect(generic.value).toBe('generic')
	})
})
