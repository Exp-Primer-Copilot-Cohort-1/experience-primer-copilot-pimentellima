import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'

class Email extends Validate {
	private constructor(email: string) {
		super(email)
		this.validate()
	}

	public validate(): this {
		const emailSchema = z.string().email()
		emailSchema.parse(this.value)
		return this
	}

	public static build(email: string): Email {
		return new Email(email)
	}
}

export default Email
