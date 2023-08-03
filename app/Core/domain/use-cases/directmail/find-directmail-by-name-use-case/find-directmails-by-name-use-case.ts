import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { DirectmailManagerInterface } from '../../../repositories/interface'

type FindAllProps = {
	name?: string
	unity_id: string
}

export class FindDirectmailsByNameUseCase implements UseCase<FindAllProps, any[]> {
	constructor(private readonly directmailManager: DirectmailManagerInterface) { }

	public async execute(input: FindAllProps): PromiseEither<AbstractError, any[]> {
		
		const directmailOrErr = await this.directmailManager.findByName(
			input.name || '',
			input.unity_id,
		)
		if (directmailOrErr.isLeft()) {
			return left(directmailOrErr.extract())
		}

		return right(directmailOrErr.extract())
	}
}
