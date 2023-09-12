import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Validate } from '../abstract/validate.abstract'

class Document extends Validate {
	private constructor(document: string, force: boolean) {
		super(document)
		this.validate(document, force)
	}

	public validate(document: string, force: boolean): this {
		if (process.env.NODE_ENV === 'test' && !force) {
			return this
		}

		if (!cpf.isValid(document) && !cnpj.isValid(document)) {
			throw new Error('Invalid document')
		}

		return this
	}

	public static build(document: string, force = false): Document {
		return new Document(document, force)
	}
}

export default Document
