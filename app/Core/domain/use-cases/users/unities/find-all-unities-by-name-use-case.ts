import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'

type Input = {
	name?: string
}

@injectable()
@registry([{ token: FindAllUnityByNameUseCase, useClass: FindAllUnityByNameUseCase }])
export class FindAllUnityByNameUseCase implements UseCase<Input, IUnity[]> {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract) {
	}

	public async execute({ name }): PromiseEither<AbstractError, IUnity[]> {
		if (!name) {
			return left(new MissingParamsError('name is required'))
		}
		const unitiesOrErr = await this.manager.findByName(name)

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract())
		}

		return unitiesOrErr
	}
}
