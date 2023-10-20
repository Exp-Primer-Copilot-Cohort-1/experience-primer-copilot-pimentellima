import { UnityNotFoundError } from 'App/Core/domain/errors'
import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { DrPerformanceMongoose } from 'App/Core/domain/repositories/dr_performance'
import { DrPerformanceManager } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'

type NewDrPerformance = {
	unity: IUnity
	admin: IAdminUser
	franchised?: boolean
}

type Message = { message: string }

export type INewDrPerformanceUseCase = UseCase<NewDrPerformance, Message>

@injectable()
@registry([{
	token: CreateFranchiseDrPerformanceUseCase,
	useClass: CreateFranchiseDrPerformanceUseCase
}])
export class CreateFranchiseDrPerformanceUseCase implements INewDrPerformanceUseCase {

	constructor(
		@inject(DrPerformanceMongoose) private readonly manager: DrPerformanceManager
	) { } // eslint-disable-line

	public async execute({
		admin,
		unity,
		franchised = false,
	}: NewDrPerformance): PromiseEither<AbstractError, Message> {
		if (!admin._id) return left(new IdNotProvidedError())
		if (!unity._id) return left(new UnityNotFoundError())

		if (!franchised) return right({ message: 'not franchised' })

		await this.manager.addAdmin(admin)
		await this.manager.addUnity(unity)

		return right({ message: 'ok' })
	}
}
