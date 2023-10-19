/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHealthInsuranceInProcedure, IProcedure } from 'App/Types/IProcedure'
import { Generic, StockProcedure } from 'App/Types/ITransaction'
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNumber,
	IsString,
	MaxLength,
	Min,
	MinLength,
	validateSync
} from 'class-validator'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { Entity } from '../abstract/entity.abstract'

/**
 * Classe que representa uma conta.
 */
export class ProcedureEntity extends Entity implements IProcedure {
	@MinLength(3) @MaxLength(255) @IsString() name: string
	@IsBoolean() active: boolean
	@IsString() color: string
	@IsArray() @MinLength(1, { each: true }) profs: string[]
	@IsNumber() @Min(0) minutes: number
	@ArrayMinSize(1) @IsArray() health_insurances: IHealthInsuranceInProcedure[]
	@IsArray() products?: StockProcedure[]

	private constructor() {
		super()
	}

	defineName(name: string): this {
		this.name = name
		return this
	}

	defineColor(color: string): this {
		this.color = color
		return this
	}

	defineProfs(profs: string[] | Generic[]): this {
		this.profs = profs.map(
			(prof: string | Generic) => (typeof prof === 'string' ? prof : prof.value),
		)
		return this
	}

	defineProducts(products: StockProcedure[] = []): this {
		this.products = products
		return this
	}

	defineMinutes(minutes: number | string): this {
		this.minutes = typeof minutes === 'string' ? Number(minutes) : minutes
		return this
	}

	defineHealthInsurances(health_insurances: IHealthInsuranceInProcedure[] = []): this {
		this.health_insurances = health_insurances
		return this
	}


	defineActive(active: boolean = true): this {
		this.active = active
		return this
	}


	public static async build(
		params: IProcedure,
	): PromiseEither<AbstractError, ProcedureEntity> {
		try {

			const procedure = new ProcedureEntity()
				.defineActive(params.active)
				.defineName(params.name)
				.defineColor(params.color)
				.defineProfs(params.profs as Generic[])
				.defineProducts(params.products)
				.defineMinutes(params.minutes)
				.defineHealthInsurances(params.health_insurances)
				.defineUnityId(params.unity_id as string)

			const errors = validateSync(procedure)

			if (errors.length) throw errors

			return right(procedure)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default ProcedureEntity
