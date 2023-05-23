import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'

import { ProceduresManagerInterface } from '../../../repositories/interface'

type Data = {
	active: boolean
	color: string
	name: string
	minutes: number
	value: number
	products: any
	health_insurance_id: string
	prof: any
	prof_resp: any
	health_insurance: any
}
export class CreateProceduresUseCase implements UseCase<Data, any> {
	constructor(private readonly proceduresManager: ProceduresManagerInterface) { }

	public async execute(params: Data): PromiseEither<AbstractError, any> {
		const procedureOrErr = await this.proceduresManager.createProcedure(params)

		return right(procedureOrErr.extract())
	}
}
