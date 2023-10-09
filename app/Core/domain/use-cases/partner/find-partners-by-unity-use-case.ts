import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IPartner } from 'App/Types/IPartner'
import { inject, injectable, registry } from 'tsyringe'
import { PartnerMongooseRepository } from '../../repositories'
import { PartnerManagerInterface } from '../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}
@injectable()
@registry([{ token: FindPartnersByUnityUseCase, useClass: FindPartnersByUnityUseCase }])
export class FindPartnersByUnityUseCase implements UseCase<FindAllProps, IPartner[]> {
	constructor(@inject(PartnerMongooseRepository) private readonly manager: PartnerManagerInterface) { }

	public async execute({
		unity_id,
	}: FindAllProps): PromiseEither<AbstractError, any[]> {
		return await this.manager.findAll(unity_id)
	}
}
