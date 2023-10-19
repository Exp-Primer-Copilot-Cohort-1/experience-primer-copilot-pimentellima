import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { GetterParams, getGetters } from '../helpers/getters-params-entitys'

interface IEntity {
	_id: string
	created_at: Date
	updated_at: Date
}

export abstract class Entity implements IEntity {
	_id: string
	created_at: Date
	updated_at: Date
	unity_id: string

	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	public updateId(id: string): this {
		if (!id) {
			return this
		}

		if (id !== this._id) {
			throw new Error('Id is not the same')
		}

		return this
	}

	public defineId(id = ''): this {
		if (!id) {
			return this
		}

		this._id = id
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

	public defineCreatedAt(created_at?: Date | string): this {
		const date = this.generateDate(created_at)

		if (!date) {
			return this
		}

		this.created_at = date
		return this
	}

	public defineUpdatedAt(updated_at?: Date | string): this {
		const date = this.generateDate(updated_at)

		if (!date) {
			return this
		}

		this.updated_at = date
		return this
	}

	public defineUnityId(unity_id?: string): this {
		if (!unity_id) {
			return this
		}

		this.unity_id = unity_id
		return this
	}

	public params(): GetterParams<this> {
		return getGetters(this)
	}

	static build: (Entity: any) => PromiseEither<AbstractError, Entity>
}
