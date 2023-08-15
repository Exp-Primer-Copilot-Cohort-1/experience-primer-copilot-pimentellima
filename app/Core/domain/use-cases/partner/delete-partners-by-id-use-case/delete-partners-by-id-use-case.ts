import LogDecorator from 'App/Core/decorators/log-decorator'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PartnerManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPartner } from 'Types/IPartner'

type Input = {
	id: string
}

export class DeletePartnerByIdUseCase implements UseCase<Input, IPartner> {
	constructor(private readonly partnerManager: PartnerManagerInterface) { }

	@LogDecorator('partners', 'delete')
	public async execute(input: Input): PromiseEither<AbstractError, IPartner> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const partnerOrErr = await this.partnerManager.deletePartnerById(input.id)

		return partnerOrErr
	}
}
