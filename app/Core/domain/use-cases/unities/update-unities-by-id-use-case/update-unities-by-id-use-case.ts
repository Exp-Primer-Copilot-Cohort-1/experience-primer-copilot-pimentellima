import { ProfileUnityEntity } from 'App/Core/domain/entities/profile/unity'
import { UnitNotFoundError } from 'App/Core/domain/errors'
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'

export class UpdateUnitiesByIdUseCase implements UseCase<Partial<IUnity>, IUnity> {
	constructor(private readonly unityManager: UnitiesManagerInterface) { }

	public async execute(data: IUnity): PromiseEither<AbstractError, IUnity> {
		if (!data?._id) {
			return left(new UnitNotFoundError())
		}

		const unityOrErr = await ProfileUnityEntity.build(data)

		if (unityOrErr.isLeft()) return left(unityOrErr.extract())

		const unity = unityOrErr.extract()

		const unitiesOrErr = await this.unityManager.update(unity._id.toString(), unity)

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract())
		}

		return unitiesOrErr
	}
}
