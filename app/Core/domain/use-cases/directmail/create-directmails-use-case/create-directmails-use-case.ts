import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { IDirectmail } from 'Types/IDirectmail'
import { DirectmailManagerInterface } from '../../../repositories/interface'

export class CreateDirectmailsUseCase
	implements UseCase<Partial<IDirectmail>, IDirectmail>
{
	constructor(private readonly directmailsManager: DirectmailManagerInterface) { }

	public async execute(
		directmails: Partial<IDirectmail>,
	): PromiseEither<AbstractError, IDirectmail> {
		const directmailsOrErr = await this.directmailsManager.createDirectmails(
			directmails,
		)

		return directmailsOrErr
	}
}
