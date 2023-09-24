import { IOptsQuery } from 'App/Types/IOptsQuery'

export class OptsQuery implements IOptsQuery {
	sort: string
	limit: number
	skip: number
	active: boolean

	private constructor() { } // eslint-disable-line @typescript-eslint/no-empty-function, prettier/prettier

	defineSort(sort = '--name'): OptsQuery {
		this.sort = sort
		return this
	}

	defineSize(limit = 100): OptsQuery {
		this.limit = Number(limit)
		return this
	}

	defineSkip(skip = 0): OptsQuery {
		this.skip = Number(skip)
		return this
	}

	defineActive(active = true): OptsQuery {
		if (typeof active === 'string') {
			active = active === 'true'
		}

		this.active = Boolean(active)
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
