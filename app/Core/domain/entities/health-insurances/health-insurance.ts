import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance, Profs } from 'Types/IHealthInsurance'

export class HealtInsuranceEntity implements IHealthInsurance {
	private _id_: string
	private _register_code: string
	private _carence: number
	private _profs: Profs[]
	private _active: boolean
	private _unity_id: string
	private _created_at: string | Date
	private _updated_at: string | Date
	private _name: string

	get _id(): string {
		return this._id_
	}

	get register_code(): string {
		return this._register_code
	}

	get carence(): number {
		return this._carence
	}

	get profs(): Profs[] {
		return this._profs
	}

	get active(): boolean {
		return this._active
	}

	get unity_id(): string {
		return this._unity_id
	}

	get created_at(): string | Date {
		return this._created_at
	}

	get updated_at(): string | Date {
		return this._updated_at
	}

	get name(): string {
		return this._name
	}

	private constructor() { }

	defineId(id: string): HealtInsuranceEntity {
		this._id_ = id
		return this
	}

	defineName(name: string): HealtInsuranceEntity {
		this._name = name
		return this
	}

	defineRegisterCode(register_code: string): HealtInsuranceEntity {
		this._register_code = register_code
		return this
	}

	defineCarence(carence: number): HealtInsuranceEntity {
		this._carence = carence
		return this
	}

	defineProfs(profs: Profs[]): HealtInsuranceEntity {
		this._profs = profs
		return this
	}

	defineActive(active: boolean): HealtInsuranceEntity {
		this._active = active
		return this
	}

	defineUnityId(unity_id: string): HealtInsuranceEntity {
		this._unity_id = unity_id
		return this
	}

	defineCreatedAt(created_at: string | Date): HealtInsuranceEntity {
		this._created_at = created_at
		return this
	}

	defineUpdatedAt(updated_at: string | Date): HealtInsuranceEntity {
		this._updated_at = updated_at
		return this
	}

	static async build(
		params: IHealthInsurance,
	): PromiseEither<AbstractError, HealtInsuranceEntity> {
		try {
			return right(
				new HealtInsuranceEntity()
					.defineId(params._id)
					.defineName(params.name)
					.defineRegisterCode(params.register_code)
					.defineCarence(params.carence)
					.defineProfs(params.profs)
					.defineActive(params.active)
					.defineUnityId(params.unity_id.toString())
					.defineCreatedAt(params.created_at)
					.defineUpdatedAt(params.updated_at),
			)
		} catch (error) {
			return left(error as any)
		}
	}
}
