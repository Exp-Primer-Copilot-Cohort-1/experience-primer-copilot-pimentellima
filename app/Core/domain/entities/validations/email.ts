import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'
import { EmailInvalidError } from '../errors/email-invalid'

class Email extends Validate<string> {
	private constructor(email: string) {
		super(email)
		this.validate()
	}

	public validate(): this {
		const emailSchema = z.string().email()
		const { success } = emailSchema.safeParse(this.value)

		if (!success) throw new EmailInvalidError()

		return this
	}

	public static build(email: string): Email {
		return new Email(email)
	}
}

export default Email
