import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'

export class UpdateUnitiesByIdUseCase implements UseCase<Partial<IUnity>, IUnity> {
	constructor(private readonly unityManager: UnitiesManagerInterface) { }

	public async execute(unity: Partial<IUnity>): PromiseEither<AbstractError, IUnity> {
		if (!unity?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const unitiesOrErr = await this.unityManager.updateUnitiesById(unity._id, unity)

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract())
		}

		return unitiesOrErr
	}
}
