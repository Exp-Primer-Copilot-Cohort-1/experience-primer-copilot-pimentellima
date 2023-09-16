import { DrPerformanceManager } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IAdminUser } from 'App/Types/IAdminUser'
import { IUnity } from 'App/Types/IUnity'

type NewDrPerformance = {
	unity: IUnity
	admin: IAdminUser
	franchised?: boolean
}

type Message = { message: string }

export type NewDrPerformanceUseCase = UseCase<NewDrPerformance, Message>

export class CreateFranchiseDrPerformanceUseCase implements NewDrPerformanceUseCase {
	constructor(private readonly manager: DrPerformanceManager) { } // eslint-disable-line

	public async execute({
		admin,
		unity,
		franchised = false,
	}: NewDrPerformance): PromiseEither<AbstractError, Message> {
		if (!admin._id) return left(new AbstractError('Admin not found', 401))
		if (!unity._id) return left(new AbstractError('Unity not found', 401))

		if (!franchised) return right({ message: 'not franchised' })

		await this.manager.addAdmin(admin)
		await this.manager.addUnity(unity)

		return right({ message: 'ok' })
	}
}
