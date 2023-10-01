import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'
import { NameInvalidError } from '../errors/name-invalid'

class Name extends Validate<string> {
	private constructor(name: string) {
		super(name)
		this.validate(name)
	}

	public validate(name: string): this {
		const nameSchema = z.string().min(3).max(255)

		const { success } = nameSchema.safeParse(name)

		if (!success) {
			throw new NameInvalidError()
		}

		return this
	}

	public static build(name: string): Name {
		return new Name(name)
	}
}

export default Name
