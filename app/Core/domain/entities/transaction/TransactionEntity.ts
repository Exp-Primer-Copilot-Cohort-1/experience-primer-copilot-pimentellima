import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { Generic, IProcedureTransaction, ITransaction } from 'App/Types/ITransaction'
import * as z from 'zod'
import { Entity } from '../abstract/entity.abstract'
import zProcedure from './z-procedure'

const validation = z.object({
	group_by: z.string(),
	activity_id: z.string().optional(),
	prof: z.string().optional().nullable(),
	client: z.string().optional().nullable(),
	procedures: z.array(zProcedure.optional().nullable()).optional().nullable(),
	account: z.string(),
	cost_center: z.string(),
	financial_category: z.string(),
	paid: z.boolean().optional(),
	amount: z.number(),
	date: z.union([z.string(), z.date()]),
	paymentForm: z.string(),
	description: z.string().optional(),
	type: z.enum(['income', 'expense']),
	occurrences: z.enum(['once', 'daily', 'weekly', 'biweekly', 'monthly']).optional(),
	installment: z.boolean(),
	installmentCurrent: z.number().optional(),
	installments: z.number().optional(),
	active: z.boolean().optional(),
})
export class TransactionEntity extends Entity implements ITransaction {
	amount: number
	activity_id?: string
	active?: boolean | undefined
	group_by: string
	unity_id: string
	prof?: string
	client?: string
	procedures?: IProcedureTransaction[]
	account: string
	cost_center: string
	financial_category: string
	paid?: boolean
	date: Date
	paymentForm: string
	description?: string
	type: 'income' | 'expense'
	occurrences?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly'
	installment: boolean
	installmentCurrent?: number
	installments?: number

	defineGroupBy(group_by: string) {
		this.group_by = group_by
		return this
	}

	defineProf(prof?: string | Generic) {
		if (typeof prof === 'string') {
			this.prof = prof
		} else {
			this.prof = prof?.value as string
		}
		return this
	}
	defineClient(client?: string | Generic) {
		if (typeof client === 'string') {
			this.client = client
		} else {
			this.client = client?.value as string
		}
		return this
	}

	defineProcedures(procedures: IProcedureTransaction[] = []) {
		this.procedures = procedures
		return this
	}

	defineInstallmentCurrent(installmentCurrent = 1) {
		this.installmentCurrent = installmentCurrent
		return this
	}

	defineType(type: 'expense' | 'income') {
		this.type = type
		return this
	}

	defineAccount(account: string | Generic) {
		if (typeof account === 'string') {
			this.account = account
		} else {
			this.account = account?.value as string
		}
		return this
	}

	defineUnityId(unity_id: string) {
		this.unity_id = unity_id
		return this
	}

	defineFinancialCategory(financial_category: string | Generic) {
		if (typeof financial_category === 'string') {
			this.financial_category = financial_category
		} else {
			this.financial_category = financial_category?.value as string
		}
		return this
	}

	defineAmount(amount: number) {
		this.amount = amount
		return this
	}

	definePaymentForm(value: string) {
		this.paymentForm = value
		return this
	}

	defineDate(value: Date) {
		this.date = value
		return this
	}

	defineDescription(value?: string) {
		this.description = value
		return this
	}

	defineInstallment(value: boolean) {
		this.installment = value
		return this
	}

	defineInstallments(value?: number) {
		this.installments = value
		return this
	}

	defineCostCenter(cost_center: string | Generic) {
		if (typeof cost_center === 'string') {
			this.cost_center = cost_center
		} else {
			this.cost_center = cost_center?.value as string
		}
		return this
	}

	definePaid(paid = true) {
		this.paid = paid
		return this
	}

	public static async build(
		values: ITransaction,
	): PromiseEither<AbstractError, TransactionEntity> {
		try {
			const t = new TransactionEntity()
				.defineAccount(values.account as string | Generic)
				.defineClient(values.client as string | Generic)
				.defineProf(values.prof as string | Generic)
				.defineCostCenter(values.cost_center as string | Generic)
				.defineFinancialCategory(values.financial_category as string | Generic)
				.defineGroupBy(values.activity_id || (values.group_by as string))
				.defineDate(new Date(values.date))
				.defineAmount(values.amount)
				.defineUnityId(values.unity_id?.toString())
				.definePaymentForm(values.paymentForm)
				.definePaid(values.paid)
				.defineType(values.type)
				.defineProcedures(values.procedures)
				.defineInstallment(values.installment)
				.defineInstallments(values.installments)
				.defineInstallmentCurrent(values.installmentCurrent)
				.defineDescription(values.description)

			validation.parse(t)

			return right(t)
		} catch (err) {
			return left(new AbstractError('Error Zod Validation', 401, err))
		}
	}
}
