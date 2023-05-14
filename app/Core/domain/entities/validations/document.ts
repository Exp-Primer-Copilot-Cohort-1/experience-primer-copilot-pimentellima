import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Validate } from '../abstract/validate.abstract'

class Document extends Validate {
	private constructor(document: string) {
		super(document)
		this.validate(document)
	}

	public validate(document: string): this {
		if (process.env.NODE_ENV === 'test') {
			return this
		}

		if (!cpf.isValid(document) && !cnpj.isValid(document)) {
			throw new Error('Invalid document')
		}

		return this
	}

	public static build(document: string): Document {
		return new Document(document)
	}
}

export default Document
