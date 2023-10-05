import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { IPartner } from 'App/Types/IPartner'
import { PartnerManagerInterface } from '../../repositories/interface'

export class UpdatePartnersByIdUseCase implements UseCase<Partial<IPartner>, IPartner> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { } // eslint-disable-line

	public async execute(
		{ _id, ...partner }: Partial<IPartner>,
	): PromiseEither<AbstractError, IPartner> {
		if (!_id) {
			return left(new MissingParamsError('_id is required'))
		}
		return await this.partnerManager.update(
			_id.toString(),
			partner,
		)
	}
}
