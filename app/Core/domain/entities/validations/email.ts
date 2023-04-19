import { z } from 'zod';

class ValidateEmail implements ValidateEntity {
	public email: string;

	private constructor(email: string) {
		this.defineEmail(email);
		this.validate();
	}

	public validate(): this {
		const emailSchema = z.string().email();
		emailSchema.parse(this.email);
		return this;
	}

	public defineEmail(email: string): this {
		if (!email) {
			throw new Error('ValidateEmail is required');
		}

		this.email = email;
		return this;
	}

	public static build(email: string): ValidateEmail {
		return new ValidateEmail(email);
	}
}

export default ValidateEmail;
