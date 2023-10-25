import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { PartnerManagerContract } from 'App/Core/domain/repositories/interface'
import { IPartner } from 'App/Types/IPartner'
import { inject, injectable, registry } from 'tsyringe'
@injectable()
@registry([{ token: CreatePartnersUseCase, useClass: CreatePartnersUseCase }])
export class CreatePartnersUseCase implements UseCase<Partial<IPartner>, IPartner> {
	constructor(@inject(PartnerMongooseRepository) private readonly manager: PartnerManagerContract) { }

	public async execute(
		partner: Partial<IPartner>,
	): PromiseEither<AbstractError, IPartner> {

		return await this.manager.create(partner)
	}
}
