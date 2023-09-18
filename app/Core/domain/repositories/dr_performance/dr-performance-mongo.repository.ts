import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/helpers/session-transaction'
import { PromiseEither, right } from 'App/Core/shared'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import { IAdminUser } from 'App/Types/IAdminUser'
import { IUnity } from 'App/Types/IUnity'
import { DrPerformanceManager } from '../interface/dr-performance-manager.interface'

const FRANCHISE_NAME = 'dr_performance'

export class DrPerformanceMongoose implements DrPerformanceManager {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		private readonly session: ISessionTransaction,
	) { }

	async addUnity(unity: IUnity): PromiseEither<AbstractError, IUnity> {
		await BusinessFranchises.updateOne(
			{ name: FRANCHISE_NAME },
			{ $push: { unities: unity._id.toString() } },
			{ ...this.session.options },
		).orFail()

		return right(unity)
	}

	async addAdmin(admin: IAdminUser): PromiseEither<AbstractError, IAdminUser> {
		await BusinessFranchises.updateOne(
			{ name: FRANCHISE_NAME },
			{ $push: { admins: admin._id.toString() } },
			{ ...this.session.options },
		).orFail()

		return right(admin)
	}
}
