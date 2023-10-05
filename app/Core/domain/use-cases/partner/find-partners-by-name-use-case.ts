import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { MissingParamsError } from '../../errors/missing-params'
import { PartnerManagerInterface } from '../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindPartnersByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { }

	public async execute({ name, unity_id }: FindAllProps): PromiseEither<AbstractError, any[]> {
		if (!name) {
			return left(new MissingParamsError('name'))
		}

		return await this.partnerManager.findByName(
			name,
			unity_id,
		)
	}
}
