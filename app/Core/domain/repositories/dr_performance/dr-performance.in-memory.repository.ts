import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { IAdminUser } from 'App/Types/IAdminUser'
import { IBusinessFranchises } from 'App/Types/IBusinessFranchises'
import { IUnity } from 'App/Types/IUnity'
import { DrPerformanceManager } from '../interface/dr-performance-manager.interface'

const FRANCHISE_NAME = 'dr_performance'

export class DrPerformanceInMemory implements DrPerformanceManager {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier

	private items: IBusinessFranchises[] = []

	constructor() { }

	async addUnity(unity: IUnity): PromiseEither<AbstractError, IUnity> {
		return right(unity)
	}

	async addAdmin(admin: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		return right(admin)
	}
}
