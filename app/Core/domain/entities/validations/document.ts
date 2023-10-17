import { decryptSync } from 'App/Helpers/encrypt'
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

		const decryptedDoc = decryptSync(document)

		const isCPF = cpf.isValid(decryptedDoc) || cpf.isValid(document)
		const isCNPJ = cnpj.isValid(decryptedDoc) || cnpj.isValid(document)

		if (!isCPF && !isCNPJ) {
			throw new DocumentInvalidError()
		}

		return this
	}

	public static build(document: string, force = false): Document {
		return new Document(document, force)
	}
}

export default Document
