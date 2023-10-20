import { DefaultConfigsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { inject, injectable, registry } from 'tsyringe'
import { DefaultConfigsMongooseRepository } from '../../repositories'

type Input = never

@injectable()
@registry([{ token: ShowDefaultConfigsByUnitIdUseCase, useClass: ShowDefaultConfigsByUnitIdUseCase }])
export class ShowDefaultConfigsByUnitIdUseCase implements UseCase<Input, IDefaultConfig> {

	constructor(
		@inject(DefaultConfigsMongooseRepository)
		private readonly manager: DefaultConfigsManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, IDefaultConfig> {

		return await this.manager.find()
	}
}
