import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import LogDecorator from 'App/Core/decorators/log-decorator'
import { IPartner } from 'App/Types/IPartner'
import { PartnerManagerInterface } from '../../../repositories/interface'

export class CreatePartnersUseCase implements UseCase<Partial<IPartner>, IPartner> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { }

	@LogDecorator('partners', 'post')
	public async execute(
		partner: Partial<IPartner>,
	): PromiseEither<AbstractError, IPartner> {
		const partnerOrErr = await this.partnerManager.createPartner(partner)

		return partnerOrErr
	}
}
