import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { IPartner } from 'App/Types/IPartner'
import { PartnerManagerInterface } from '../../../repositories/interface'

export class UpdatePartnersByIdUseCase implements UseCase<Partial<IPartner>, IPartner> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { } // eslint-disable-line

	public async execute(
		partner: Partial<IPartner>,
	): PromiseEither<AbstractError, IPartner> {
		if (!partner?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const partnersOrErr = await this.partnerManager.updatePartnerById(
			partner._id.toString(),
			partner,
		)

		if (partnersOrErr.isLeft()) {
			return left(partnersOrErr.extract())
		}

		return partnersOrErr
	}
}
