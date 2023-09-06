import { ObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IProcedureTransaction, ITransaction } from 'Types/ITransaction'
import { Schema } from 'mongoose'
import * as z from 'zod'
import { Entity } from '../abstract/entity.abstract'
import zProcedure from './z-procedure'
export class TransactionEntity extends Entity implements ITransaction {
	_group_by: string
	_activity_id?: string
	_unity_id: string
	_prof?: { value: string; label: string }
	_client?: { value: string; label: string }
	_procedures?: IProcedureTransaction[]
	_bank: { value: string | Schema.Types.ObjectId; label: string }
	_cost_center: { value: string | Schema.Types.ObjectId; label: string }
	_category: { value: string | Schema.Types.ObjectId; label: string }
	_paid?: boolean
	_total: number
	_date: Date
	_paymentForm: string
	_description?: string | undefined
	_type: 'income' | 'expense'
	_occurrences?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | undefined
	_installment: boolean
	_installmentCurrent?: number | undefined
	_installments?: number | undefined

	get group_by() {
		return this._group_by
	}

	get prof() {
		return this._prof
	}

	get client() {
		return this._client
	}

	get procedures() {
		return this._procedures
	}

	get bank() {
		return this._bank
	}

	get cost_center() {
		return this._cost_center
	}

	get category() {
		return this._category
	}

	get paid() {
		return this._paid
	}

	get total() {
		return this._total
	}

	get date() {
		return this._date
	}

	get paymentForm() {
		return this._paymentForm
	}

	get description() {
		return this._description
	}

	get type() {
		return this._type
	}

	get occurrences() {
		return this._occurrences
	}

	get installment() {
		return this._installment
	}

	get installmentCurrent() {
		return this._installmentCurrent
	}

	get unity_id() {
		return this._unity_id
	}

	defineGroupBy(group_by: string) {
		this._group_by = group_by
		return this
	}

	defineProf(prof?: { value: string; label: string }) {
		this._prof = prof
		return this
	}
	defineClient(client?: { value: string; label: string }) {
		this._client = client
		return this
	}

	defineProcedures(procedures: IProcedureTransaction[] = []) {
		this._procedures = procedures
		return this
	}

	defineInstallmentCurrent(installmentCurrent = 1) {
		this._installmentCurrent = installmentCurrent
		return this
	}

	defineType(type: 'expense' | 'income') {
		this._type = type
		return this
	}

	defineBank(bank: { value: string | ObjectId; label: string }) {
		this._bank = bank
		return this
	}

	defineUnityId(unity_id: string) {
		this._unity_id = unity_id
		return this
	}

	defineCategory(category: { value: string | ObjectId; label: string }) {
		this._category = category
		return this
	}

	defineTotal(value: number) {
		this._total = value
		return this
	}

	definePaymentForm(value: string) {
		this._paymentForm = value
		return this
	}

	defineDate(value: Date) {
		this._date = value
		return this
	}

	defineDescription(value?: string) {
		this._description = value
		return this
	}

	defineInstallment(value: boolean) {
		this._installment = value
		return this
	}

	defineInstallments(value?: number) {
		this._installments = value
		return this
	}

	defineCostCenter(cost_center: { value: string | ObjectId; label: string }) {
		this._cost_center = cost_center
		return this
	}

	definePaid(paid = true) {
		this._paid = paid
		return this
	}

	public static async build(
		values: ITransaction,
	): PromiseEither<AbstractError, TransactionEntity> {
		try {
			z.object({
				group_by: z.string(),
				activity_id: z.string().optional(),
				prof: z
					.object({
						value: z.string(),
						label: z.string(),
					})
					.optional()
					.nullable(),
				client: z
					.object({
						value: z.string(),
						label: z.string(),
					})
					.optional()
					.nullable(),
				procedures: z
					.array(zProcedure.optional().nullable())
					.optional()
					.nullable(),
				bank: z.object({
					value: z.string(),
					label: z.string(),
				}),
				cost_center: z.object({
					value: z.string(),
					label: z.string(),
				}),
				category: z.object({
					value: z.string(),
					label: z.string(),
				}),
				paid: z.boolean().optional(),
				value: z.number(),
				date: z.union([z.string(), z.date()]),
				paymentForm: z.string(),
				description: z.string().optional(),
				type: z.enum(['income', 'expense']),
				occurrences: z
					.enum(['once', 'daily', 'weekly', 'biweekly', 'monthly'])
					.optional(),
				installment: z.boolean(),
				installmentCurrent: z.number().optional(),
				installments: z.number().optional(),
				active: z.boolean().optional(),
			}).parse(values)

			return right(
				new TransactionEntity()
					.defineBank(values.bank)
					.defineClient(values.client)
					.defineProf(values.prof)
					.defineCostCenter(values.cost_center)
					.defineCategory(values.category)
					.defineGroupBy(values.activity_id || (values.group_by as string))
					.defineDate(new Date(values.date))
					.defineTotal(values.total)
					.defineUnityId(values.unity_id?.toString())
					.definePaymentForm(values.paymentForm)
					.definePaid(values.paid)
					.defineType(values.type)
					.defineProcedures(values.procedures)
					.defineInstallment(values.installment)
					.defineInstallments(values.installments)
					.defineInstallmentCurrent(values.installmentCurrent)
					.defineDescription(values.description),
			)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Error validating payment', 500))
		}
	}
}
