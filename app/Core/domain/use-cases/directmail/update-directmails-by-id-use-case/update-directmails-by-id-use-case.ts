import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { IDirectmail } from 'Types/IDirectmail'
import { DirectmailManagerInterface } from '../../../repositories/interface'

export class UpdateDirectmailsByIdUseCase
	implements UseCase<Partial<IDirectmail>, IDirectmail>
{
	constructor(private readonly directmailsManager: DirectmailManagerInterface) { }

	public async execute(
		directmails: Partial<IDirectmail>,
	): PromiseEither<AbstractError, IDirectmail> {
		if (!directmails?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const directmailsOrErr = await this.directmailsManager.updateDirectmailsById(
			directmails._id,
			directmails,
		)

		if (directmailsOrErr.isLeft()) {
			return left(directmailsOrErr.extract())
		}

		return directmailsOrErr
	}
}
