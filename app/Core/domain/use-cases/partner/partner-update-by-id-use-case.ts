import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { PartnerManagerContract } from 'App/Core/domain/repositories/interface'
import { IPartner } from 'App/Types/IPartner'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: UpdatePartnersByIdUseCase, useClass: UpdatePartnersByIdUseCase }])
export class UpdatePartnersByIdUseCase implements UseCase<Partial<IPartner>, IPartner> {
	constructor(
		@inject(PartnerMongooseRepository)
		private readonly manager: PartnerManagerContract,
	) {} // eslint-disable-line

	public async execute({
		id,
		...params
	}: Partial<IPartner> & { id: string }): PromiseEither<AbstractError, IPartner> {
		if (!id) {
			return left(new MissingParamsError('id is required'))
		}
		return await this.manager.update(id, params)
	}
}
