import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { MissingParamsError } from '../../../errors/missing-params'
import { PartnerManagerInterface } from '../../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindPartnersByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { }

	public async execute(input: FindAllProps): PromiseEither<AbstractError, any[]> {
		if (!input?.name) {
			return left(new MissingParamsError('name'))
		}
		const partnerOrErr = await this.partnerManager.findByName(
			input.name,
			input.unity_id,
		)
		if (partnerOrErr.isLeft()) {
			return left(partnerOrErr.extract())
		}

		return partnerOrErr
	}
}
