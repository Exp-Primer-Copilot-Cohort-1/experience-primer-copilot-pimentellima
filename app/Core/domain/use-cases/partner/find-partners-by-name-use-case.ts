import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { PartnerManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { inject, injectable, registry } from 'tsyringe'

type FindAllProps = {
	name?: string
	unity_id: string
}
@injectable()
@registry([{ token: FindPartnersByNameUseCase, useClass: FindPartnersByNameUseCase }])
export class FindPartnersByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(@inject(PartnerMongooseRepository) private readonly manager: PartnerManagerContract) { }

	public async execute({ name, unity_id }: FindAllProps): PromiseEither<AbstractError, any[]> {
		if (!name) {
			return left(new MissingParamsError('name'))
		}

		return await this.manager.findByName(
			name,
			unity_id,
		)
	}
}
