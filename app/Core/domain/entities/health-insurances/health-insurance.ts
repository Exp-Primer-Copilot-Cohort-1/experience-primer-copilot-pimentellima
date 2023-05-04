import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsurance, Profs } from 'Types/IHealthInsurance'
import { Entity } from '../abstract/entity.abstract'

export class HealtInsuranceEntity extends Entity implements IHealthInsurance {
	private _register_code: string
	private _carence: number
	private _profs: Profs[]
	private _active: boolean
	private _unity_id: string
	private _name: string

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

	get name(): string {
		return this._name
	}

	private constructor() {
		super()
	}

	defineRegisterCode(register_code: string): HealtInsuranceEntity {
		this._register_code = register_code
		return this
	}

	defineCarence(carence = 0): HealtInsuranceEntity {
		this._carence = carence
		return this
	}

	defineProfs(profs: Profs[] = []): HealtInsuranceEntity {
		this._profs = profs
		return this
	}

	defineActive(active = true): HealtInsuranceEntity {
		this._active = active
		return this
	}

	defineUnityId(unity_id: string): HealtInsuranceEntity {
		if (!unity_id) {
			throw new Error('Unity id not defined')
		}

		this._unity_id = unity_id
		return this
	}

	defineName(name: string): HealtInsuranceEntity {
		if (!name) {
			throw new Error('Name not defined')
		}

		this._name = name
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
