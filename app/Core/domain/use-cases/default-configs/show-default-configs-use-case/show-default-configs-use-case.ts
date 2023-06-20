import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import {
	DefaultConfigsManagerInterface
} from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

type Input = {
	id: string
}

export class ShowDefaultConfigsByIdUseCase implements UseCase<Input, any> {
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, any> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const configsOrErr = await this.configsManager.findById(input.id)

		if (configsOrErr.isLeft()) {
			return left(configsOrErr.extract())
		}

		return configsOrErr
	}
}
