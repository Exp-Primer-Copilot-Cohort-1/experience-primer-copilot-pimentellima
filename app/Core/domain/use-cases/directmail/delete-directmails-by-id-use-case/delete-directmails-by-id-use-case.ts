import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import {
	DirectmailManagerInterface
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IDirectmail } from 'Types/IDirectmail'

type Input = {
	id: string
}

export class DeleteDirectmailsByIdUseCase implements UseCase<Input, IDirectmail> {
	constructor(private readonly directmailsManager: DirectmailManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, IDirectmail> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const directmailsErr = await this.directmailsManager.deleteDirectmailsById(
			input.id,
		)

		return directmailsErr
	}
}
