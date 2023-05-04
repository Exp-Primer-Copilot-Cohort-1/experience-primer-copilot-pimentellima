import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { GetterParams, getGetters } from '../helpers/getters-params-entitys'

interface IEntity {
	_id: string
	created_at: Date
	updated_at: Date
}

export abstract class Entity implements IEntity {
	private _id_: string
	private _created_at: Date
	private _updated_at: Date

	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	public get _id(): string {
		return this._id_
	}

	public get created_at(): Date {
		return this._created_at
	}

	public get updated_at(): Date {
		return this._updated_at
	}

	public defineId(id: string): this {
		if (!id) {
			return this
		}

		this._id_ = id
		return this
	}

	private generateDate(date?: Date | string): Date | null {
		if (!date) {
			return null
		}

		if (typeof date === 'string') {
			return new Date(date)
		}

		return date
	}

	public defineCreatedAt(created_at: Date | string): this {
		const date = this.generateDate(created_at)

		if (!date) {
			return this
		}

		this._created_at = date
		return this
	}

	public defineUpdatedAt(updated_at: Date | string): this {
		const date = this.generateDate(updated_at)

		if (!date) {
			return this
		}

		this._updated_at = date
		return this
	}

	public params(): GetterParams<this> {
		return getGetters(this)
	}

	static build: (Entity: any) => PromiseEither<AbstractError, Entity>
}
