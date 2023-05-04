import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { IUnity } from 'Types/IUnity'
import { MissingParamsError } from '../../errors/missing-params'
import { UnitDateExpiredError } from '../../errors/unit-date-expired'
import { UnitiesManagerInterface } from '../../repositories/interface'

export class UnityValidationUseCase implements UseCase<IUnity, IUnity> {
	constructor(private readonly manager: UnitiesManagerInterface) { }

	public async execute(unity: IUnity): PromiseEither<AbstractError, IUnity> {
		const dateNow = new Date()

		if (!unity || !unity._id) {
			return left(
				new MissingParamsError()
					.addParam('unity', unity)
					.addParam('unity._id', unity?._id),
			)
		}

		const unityExists = await this.manager.findOne(unity._id)

		if (unityExists.isLeft()) {
			return unityExists
		}

		if (unity.date_expiration && new Date(unity.date_expiration) < dateNow) {
			return left(new UnitDateExpiredError())
		}

		return right(unity)
	}
}
