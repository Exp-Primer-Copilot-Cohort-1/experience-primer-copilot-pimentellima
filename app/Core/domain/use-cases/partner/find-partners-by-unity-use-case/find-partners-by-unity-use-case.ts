import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPartner } from 'Types/IPartner'
import { PartnerManagerInterface } from '../../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindPartnersByUnityUseCase implements UseCase<FindAllProps, IPartner[]> {
	constructor(private readonly manager: PartnerManagerInterface) { }

	public async execute({
		unity_id,
	}: FindAllProps): PromiseEither<AbstractError, any[]> {
		const partnerOrErr = await this.manager.findAll(unity_id)
		if (partnerOrErr.isLeft()) {
			return left(partnerOrErr.extract())
		}

		return partnerOrErr
	}
}
