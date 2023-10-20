import db, { ClientSession } from '@ioc:Mongoose'
import { Lifecycle, registry, scoped } from 'tsyringe'
import { ISessionTransaction } from './infra'
@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: SessionTransaction, useClass: SessionTransaction }])
export class SessionTransaction implements ISessionTransaction {
	manager?: ClientSession
	options?: any = {}

	constructor() {
		this.manager = undefined
	}

	async startSession() {
		this.manager = await db.startSession()
		this.manager.startTransaction()
		this.options = { session: this.manager }
	}

	async commitTransaction() {
		await this.manager?.commitTransaction()
		await this.endSession()
	}

	async abortTransaction() {
		await this.manager?.abortTransaction()
		await this.endSession()
	}

	async endSession() {
		await this.manager?.endSession()
	}
}
