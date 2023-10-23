import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'
import { UnityIdNotProvidedError } from '../../errors'
import { UnityDateExpiredError } from '../../errors/unity-date-expired'
import { UnitiesMongooseRepository } from '../../repositories'

@injectable()
@registry([{ token: UnityValidationUseCase, useClass: UnityValidationUseCase }])
export class UnityValidationUseCase implements UseCase<IUnity, IUnity> {
	constructor(
		@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract
	) { }

	public async execute({ _id }: IUnity): PromiseEither<AbstractError, IUnity> {

		if (!_id) return left(new UnityIdNotProvidedError())

		const unityExists = await this.manager.findOne(_id as string)

		if (unityExists.isLeft()) return unityExists

		const unity = unityExists.extract()

		const dateNow = new Date()
		if (unity.date_expiration && new Date(unity.date_expiration) < dateNow) {
			return left(new UnityDateExpiredError())
		}

		return right(unity)
	}
}
