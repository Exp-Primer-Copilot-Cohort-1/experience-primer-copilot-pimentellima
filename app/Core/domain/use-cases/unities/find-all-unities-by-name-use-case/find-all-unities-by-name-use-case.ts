import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IUnity } from 'Types/IUnity'

type Input = {
	name?: string
}

export class FindAllUnityByNameUseCase implements UseCase<Input, IUnity[]> {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(private readonly unityManager: UnitiesManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, IUnity[]> {
		if (!input?.name) {
			return left(new MissingParamsError('name is required'))
		}
		const unitiesOrErr = await this.unityManager.findByName(input.name)

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract())
		}

		return unitiesOrErr
	}
}
