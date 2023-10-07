import { AbstractError } from 'App/Core/errors/error.interface'

export class UnitNotFranchise extends AbstractError {
	constructor() {
		super('Esta unidade não é uma franquia.', 401)
		this.name = 'UnitNotFranchise'
	}
}
