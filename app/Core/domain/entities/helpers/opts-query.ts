import { ROLES } from 'App/Roles/types'
import { IOptsQuery } from 'App/Types/IOptsQuery'
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator'
import { Lifecycle, scoped } from 'tsyringe'
import { ProfNotIdProvidedError } from '../../errors/prof-not-id-provider'
@scoped(Lifecycle.ContainerScoped)
export class OptsQuery implements IOptsQuery {
	@IsString() sort: string
	@IsNumber() limit: number
	@IsNumber() skip: number
	@IsBoolean() active: boolean
	@IsEnum(ROLES) role: ROLES
	@IsString() prof?: string
	@IsString() unity_id: string

	constructor() {
		this.defineSort()
		this.defineSize()
		this.defineSkip()
		this.defineActive()
	} // eslint-disable-line @typescript-eslint/no-empty-function, prettier/prettier

	defineSort(sort = '--name'): this {
		this.sort = sort
		return this
	}

	defineSize(limit = 100): this {
		this.limit = Number(limit)
		return this
	}

	defineSkip(skip = 0): this {
		this.skip = Number(skip)
		return this
	}

	get where(): Record<string, unknown> {
		const where: Record<string, unknown> = {}

		if (this.active) where.active = this.active
		if (this.prof) where.prof = this.prof
		if (this.unity_id) where.unity_id = this.unity_id

		return where
	}

	defineActive(active = true): this {
		if (typeof active === 'string') {
			active = active === 'true'
		}

		this.active = Boolean(active)
		return this
	}

	private defineProf = (prof?: string): this => {
		if (!prof) throw new ProfNotIdProvidedError()

		this.prof = prof
		return this
	}

	defineRoles(role: ROLES, prof?: string): this {
		this.role = role

		if (role === ROLES.PROF) this.defineProf(prof)

		return this
	}

	defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}

	static build(opts?: IOptsQuery): OptsQuery {
		return new OptsQuery()
			.defineSort(opts?.sort)
			.defineSize(opts?.limit)
			.defineSkip(opts?.skip)
			.defineActive(opts?.active)
			.defineRoles(opts?.role as ROLES, opts?.prof)
			.defineUnityId(opts?.unity_id as string)
	}
}
