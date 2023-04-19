import { cnpj, cpf } from 'cpf-cnpj-validator';

class ValidateDocument implements ValidateEntity {
	public document: string;

	private constructor(document: string) {
		this.defineDocument(document);
		this.validate();
	}

	public validate(): this {
		if (!cpf.isValid(this.document) && !cnpj.isValid(this.document)) {
			throw new Error('Invalid document');
		}

		return this;
	}

	public defineDocument(document: string): this {
		if (!document) {
			throw new Error('Document is required');
		}

		this.document = document;
		return this;
	}

	public static build(document: string): ValidateDocument {
		return new ValidateDocument(document);
	}
}

export default ValidateDocument;
