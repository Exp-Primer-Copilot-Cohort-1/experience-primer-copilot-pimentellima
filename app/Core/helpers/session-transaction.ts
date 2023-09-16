import db, { ClientSession } from '@ioc:Mongoose'

export interface ISessionTransaction {
	manager?: any
	startSession(): Promise<void>
	commitTransaction(): Promise<void>
	abortTransaction(): Promise<void>
	endSession(): Promise<void>
}

export class SessionTransaction {
	manager?: ClientSession

	constructor() {
		this.manager = undefined
	}

	async startSession() {
		this.manager = await db.startSession()
		this.manager.startTransaction()
	}

	async commitTransaction() {
		await this.manager?.commitTransaction()
	}

	async abortTransaction() {
		await this.manager?.abortTransaction()
	}

	async endSession() {
		await this.manager?.endSession()
	}
}
