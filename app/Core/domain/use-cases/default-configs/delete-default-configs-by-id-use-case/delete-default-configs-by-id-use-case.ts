import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { DefaultConfigsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IDefaultConfig } from 'Types/IDefaultConfig'

type Input = {
	id: string
}

export class DeleteDefaultConfigsByIdUseCase implements UseCase<Input, IDefaultConfig> {
	constructor(private readonly configsManager: DefaultConfigsManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, IDefaultConfig> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const configsOrErr = await this.configsManager.deleteDefaultConfigsById(input.id)

		return configsOrErr
	}
}
