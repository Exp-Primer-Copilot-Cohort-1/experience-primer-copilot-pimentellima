import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PartnerManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPartner } from 'App/Types/IPartner'

type Input = {
	id: string
}

export class DeletePartnerByIdUseCase implements UseCase<Input, IPartner> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { } // eslint-disable-line

	public async execute({ id }: Input): PromiseEither<AbstractError, IPartner> {
		if (!id) {
			return left(new MissingParamsError('id'))
		}

		return await this.partnerManager.deleteByID(id)
	}
}
