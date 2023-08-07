import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IProcedureTransaction } from 'Types/ITransaction'
import { z } from 'zod'
import zProcedure from './z-procedure'

type StockProcedure = {
	value: string
	label: string
	quantity: number
	price_cost: number
	price_final: number
}

export class ProcedureTransactionEntity implements IProcedureTransaction {
	value: string
	label: string
	price: number
	color: string
	minutes: number
	health_insurance: { value: string; label: string }
	payment_participation: { value: string; price: number; percent: number }
	stock?: StockProcedure[]

	private constructor() { }

	defineValue(value: string): this {
		this.value = value
		return this
	}

	defineLabel(label: string): this {
		this.label = label
		return this
	}

	definePrice(price: number): this {
		this.price = price
		return this
	}

	defineColor(color: string): this {
		this.color = color
		return this
	}

	defineMinutes(minutes: number): this {
		this.minutes = minutes
		return this
	}

	defineHealthInsurance(health_insurance: { value: string; label: string }): this {
		this.health_insurance = health_insurance
		return this
	}

	definePaymentParticipation(payment_participation: {
		value: string
		price: number
		percent: number
	}): this {
		this.payment_participation = payment_participation
		return this
	}

	defineStock(stock: StockProcedure[] = []): this {
		this.stock = stock
		return this
	}

	static async build(
		procedure: IProcedureTransaction,
	): PromiseEither<AbstractError, ProcedureTransactionEntity> {
		try {
			const price = z
				.string()
				.or(z.number())
				.transform((value) => Number(value.toString().replace(',', '.')))
				.parse(procedure.price)

			zProcedure.parse({ ...procedure, price })
			return right(
				new ProcedureTransactionEntity()
					.defineValue(procedure.value)
					.defineLabel(procedure.label)
					.definePrice(price)
					.defineColor(procedure.color)
					.defineMinutes(procedure.minutes)
					.defineHealthInsurance(procedure.health_insurance)
					.definePaymentParticipation(procedure.payment_participation)
					.defineStock(procedure.stock),
			)
		} catch (error) {
			return left(
				new AbstractError('Erro ao criar entidade de procedimento', 400, error),
			)
		}
	}
}
