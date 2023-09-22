import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { Generic, IProcedureTransaction, StockProcedure } from 'App/Types/ITransaction'
import zProcedure from './z-procedure'

export class ProcedureTransactionEntity implements IProcedureTransaction {
	_id: string
	price: number
	color: string
	minutes: number
	health_insurance: string
	payment_participation: { value: string; price: number; percent: number }
	stock?: StockProcedure[]

	private constructor() { } // eslint-disable-line

	defineId(value: string): this {
		this._id = value
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

	defineHealthInsurance(health_insurance: string | Generic): this {
		if (typeof health_insurance === 'object')
			health_insurance = health_insurance.value as string

		this.health_insurance = health_insurance
		return this
	}

	definePaymentParticipation(
		payment_participation: {
			value: string
			price: number
			percent: number
		},
		price: number = this.price,
	): this {
		const { percent } = payment_participation
		payment_participation.price =
			percent > 0 ? (price / 100) * percent : payment_participation.price

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
			const p = new ProcedureTransactionEntity()
				.defineId(procedure._id?.toString() as string)
				.definePrice(procedure.price)
				.defineColor(procedure.color)
				.defineMinutes(procedure.minutes)
				.defineHealthInsurance(procedure.health_insurance as string | Generic)
				.definePaymentParticipation(
					procedure.payment_participation,
					procedure.price,
				)
				.defineStock(procedure.stock)

			zProcedure.parse(p)

			return right(p)
		} catch (error) {
			return left(
				new AbstractError('Erro ao criar entidade de procedimento', 400, error),
			)
		}
	}
}
