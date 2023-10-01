import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Validate } from '../abstract/validate.abstract'
import { DocumentInvalidError } from '../errors/document-invalid'

class Document extends Validate<string> {
	private constructor(document: string, force: boolean) {
		super(document)
		this.validate(document, force)
	}

	public validate(document: string, force: boolean): this {
		if (process.env.NODE_ENV === 'test' && !force) {
			return this
		}

		if (!cpf.isValid(document) && !cnpj.isValid(document)) {
			throw new DocumentInvalidError()
		}

		return this
	}

	public static build(document: string, force = false): Document {
		return new Document(document, force)
	}
}

export default Document
