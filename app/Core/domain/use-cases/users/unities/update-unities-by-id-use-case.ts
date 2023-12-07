import { ProfileUnityEntity } from 'App/Core/domain/entities/profile/unity'
import { UnityNotFoundError } from 'App/Core/domain/errors'
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: UpdateUnitiesByIdUseCase, useClass: UpdateUnitiesByIdUseCase }])
export class UpdateUnitiesByIdUseCase implements UseCase<Partial<IUnity>, IUnity> {
	constructor(
		@inject(UnitiesMongooseRepository)
		private readonly manager: UnitiesManagerContract,
	) {}

	public async execute({
		avatar,
		...data
	}: IUnity): PromiseEither<AbstractError, IUnity> {
		if (!data?._id) {
			return left(new UnityNotFoundError())
		}

		const unityOrErr = await ProfileUnityEntity.build(data)

		if (unityOrErr.isLeft()) return left(unityOrErr.extract())

		const unity = unityOrErr.extract()

		const unitiesOrErr = await this.manager.update(unity._id.toString(), unity)

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract())
		}

		return unitiesOrErr
	}
}
