import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { HealthInsuranceParams, IHealthInsurance } from 'Types/IHealthInsurance'
import * as z from 'zod'
import { Entity } from '../abstract/entity.abstract'

export class HealthInsuranceEntity extends Entity implements IHealthInsurance {
	private _register_code: string
	private _carence: number
	private _profs: string[]
	private _active: boolean
	private _unity_id: string
	private _name: string

	get register_code(): string {
		return this._register_code
	}

	get carence(): number {
		return this._carence
	}

	get profs(): string[] {
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

	defineRegisterCode(register_code: string): HealthInsuranceEntity {
		this._register_code = register_code
		return this
	}

	defineCarence(carence = 0): HealthInsuranceEntity {
		this._carence = carence
		return this
	}

	defineProfs(profs: string[] = []): HealthInsuranceEntity {
		this._profs = profs
		return this
	}

	defineActive(active = true): HealthInsuranceEntity {
		this._active = active
		return this
	}

	defineUnityId(unity_id: string): HealthInsuranceEntity {
		if (!unity_id) {
			throw new Error('Unity id not defined')
		}

		this._unity_id = unity_id
		return this
	}

	defineName(name: string): HealthInsuranceEntity {
		if (!name) {
			throw new Error('Name not defined')
		}

		this._name = name
		return this
	}

	static async build(
		params: HealthInsuranceParams,
	): PromiseEither<AbstractError, HealthInsuranceEntity> {
		try {
			z.object({
				name: z.string(),
				profs: z.array(z.string()),
				register_code: z.string().refine((val) => /^[0-9]*$/.test(val)),
				carence: z.number(),
			}).parse(params)

			return right(
				new HealthInsuranceEntity()
					.defineName(params.name)
					.defineRegisterCode(params.register_code)
					.defineCarence(params.carence)
					.defineProfs(params.profs as string[])
					.defineActive(true),
			)
		} catch (error) {
			return left(error as any)
		}
	}
}
