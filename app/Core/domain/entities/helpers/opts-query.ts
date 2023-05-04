import { IOptsQuery } from 'Types/IOptsQuery'

export class OptsQuery implements IOptsQuery {
	private _sort: string
	private _limit: number
	private _skip: number
	private _active: boolean

	private constructor() { }

	public get sort(): string {
		return this._sort
	}

	public get limit(): number {
		return this._limit
	}

	public get skip(): number {
		return this._skip
	}

	public get active(): boolean {
		return this._active
	}

	defineSort(sort = '--name'): OptsQuery {
		this._sort = sort
		return this
	}

	defineSize(limit = 100): OptsQuery {
		this._limit = Number(limit)
		return this
	}

	defineSkip(skip = 0): OptsQuery {
		this._skip = Number(skip)
		return this
	}

	defineActive(active = true): OptsQuery {
		if (typeof active === 'string') {
			active = active === 'true'
		}

		this._active = Boolean(active)
		return this
	}

	static build(opts?: any): OptsQuery {
		return new OptsQuery()
			.defineSort(opts?.sort)
			.defineSize(opts?.limit)
			.defineSkip(opts?.skip)
			.defineActive(opts?.active)
	}
}
