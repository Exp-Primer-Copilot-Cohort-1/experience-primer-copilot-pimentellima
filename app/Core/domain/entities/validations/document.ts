import { decryptSync } from 'App/Helpers/encrypt'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Validate } from '../abstract/validate.abstract'
import { DocumentInvalidError } from '../errors/document-invalid'
class Document extends Validate<string> {
	private constructor(document: string, force: boolean) {
		super(document)
		this.validate(document, force)
	}

	private validateDecryptedDocument(document: string): boolean {
		try {
			const decryptedDoc = decryptSync(document)
			const isCNPJ = cnpj.isValid(decryptedDoc)
			const isCPF = cpf.isValid(decryptedDoc)
			return isCNPJ || isCPF
		} catch (error) {
			return false
		}
	}

	public validate(document: string, force: boolean): this {
		if (process.env.NODE_ENV === 'test' && !force) {
			return this
		}

		const isCPF = cpf.isValid(document)
		const isCNPJ = cnpj.isValid(document)
		const isDecrypted = this.validateDecryptedDocument(document)

		if (!isCPF && !isCNPJ && !isDecrypted) {
			throw new DocumentInvalidError()
		}

		return this
	}

	public static build(document: string, force = false): Document {
		return new Document(document, force)
	}
}

export default Document
