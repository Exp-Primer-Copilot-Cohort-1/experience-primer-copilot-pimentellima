import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'

export class FindAllUnitiesUseCase implements UseCase<undefined, IUnity[]> {
	constructor(private readonly manager: UnitiesManagerInterface) { }

	public async execute(): PromiseEither<AbstractError, IUnity[]> {
		const unitiesOrErr = await this.manager.findAll()

		return unitiesOrErr
	}
}
