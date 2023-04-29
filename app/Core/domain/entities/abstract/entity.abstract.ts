import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared';
import { GetterParams, getGetters } from '../helpers/getters-params-entitys';

interface IEntity {
	id: string;
	created_at: Date;
	updated_at: Date;
}

export abstract class Entity implements IEntity {
	private _id: string;
	private _created_at: Date;
	private _updated_at: Date;

	constructor() { }

	public get id(): string {
		return this._id;
	}

	public get created_at(): Date {
		return this._created_at;
	}

	public get updated_at(): Date {
		return this._updated_at;
	}

	public defineId(id: string): this {
		if (!id) {
			return this;
		}

		this._id = id;
		return this;
	}

	public defineCreatedAt(created_at: Date): this {
		if (!created_at) {
			return this;
		}

		this._created_at = created_at;
		return this;
	}

	public defineUpdatedAt(updated_at: Date): this {
		if (!updated_at) {
			return this;
		}

		this._updated_at = updated_at;
		return this;
	}

	public params(): GetterParams<this> {
		return getGetters(this);
	}

	static build: (Entity: any) => PromiseEither<AbstractError, Entity>;
}
