import { z } from 'zod';

class Email {
	public email: string;

	private constructor(email: string) {
		this.validateEmail(email);
		this.defineEmail(email);
	}

	public validateEmail(email): this {
		const emailSchema = z.string().email();
		emailSchema.parse(email);
		return this;
	}

	public defineEmail(email: string): this {
		if (!email) {
			throw new Error('Email is required');
		}

		this.email = email;
		return this;
	}

	public static build(email: string): Email {
		return new Email(email);
	}
}

export default Email;
