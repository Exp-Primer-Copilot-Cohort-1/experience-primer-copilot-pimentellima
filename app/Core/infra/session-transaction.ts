import db, { ClientSession } from '@ioc:Mongoose'

export interface ISessionTransaction {
	manager?: any
	options?: any
	startSession(): Promise<void>
	commitTransaction(): Promise<void>
	abortTransaction(): Promise<void>
	endSession(): Promise<void>
}

export class SessionTransaction {
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
