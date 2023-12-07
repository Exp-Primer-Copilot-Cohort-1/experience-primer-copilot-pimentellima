import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { HealthInsuranceParams, IHealthInsurance } from 'App/Types/IHealthInsurance'
import { Generic } from 'App/Types/ITransaction'
import * as z from 'zod'
import { Entity } from '../abstract/entity.abstract'

const validations = z.object({
	name: z.string(),
	profs: z.array(z.string()),
	register_code: z.string().refine((val) => /^[0-9]*$/.test(val)),
	carence: z.number(),
})

export class HealthInsuranceEntity extends Entity implements IHealthInsurance {
	register_code: string
	carence: number
	profs: string[]
	active: boolean
	unity_id: string
	name: string

	private constructor() {
		super()
	}

	defineRegisterCode(register_code: string): HealthInsuranceEntity {
		this.register_code = register_code
		return this
	}

	defineCarence(carence = 0): HealthInsuranceEntity {
		this.carence = carence
		return this
	}

	defineProfs(profs: string[] | Generic[] = []): HealthInsuranceEntity {
		this.profs = profs?.map((prof: string | Generic) =>
			typeof prof === 'string' ? prof : prof.value,
		)
		return this
	}

	defineActive(active = true): HealthInsuranceEntity {
		this.active = active
		return this
	}

	defineUnityId(unity_id: string): HealthInsuranceEntity {
		if (!unity_id) {
			throw new Error('Unity id not defined')
		}

		this.unity_id = unity_id
		return this
	}

	defineName(name: string): HealthInsuranceEntity {
		if (!name) {
			throw new Error('Name not defined')
		}

		this.name = name
		return this
	}

	static async build(
		params: HealthInsuranceParams,
	): PromiseEither<AbstractError, HealthInsuranceEntity> {
		try {
			const h = new HealthInsuranceEntity()
				.defineId(params._id)
				.defineName(params.name)
				.defineRegisterCode(params.register_code)
				.defineCarence(params.carence)
				.defineProfs(params.profs)
				.defineActive(true)

			validations.parse(params)

			return right(h)
		} catch (error) {
			return left(error as any)
		}
	}
}
