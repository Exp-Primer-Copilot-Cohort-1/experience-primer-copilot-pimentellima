import { ObjectId } from "@ioc:Mongoose";
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ITransaction } from "Types/ITransaction";
import { Schema } from "mongoose";
import * as z from "zod";

export class TransactionEntity implements ITransaction {
	group_by?: string | undefined;
	activity_id?: string | undefined;
	unity_id?: string;
	prof?: { value: string; label: string } | undefined;
	client?: { value: string; label: string } | undefined;
	procedures?: { value: string; label: string }[] | undefined;
	bank: { value: string | Schema.Types.ObjectId; label: string };
	cost_center: { value: string | Schema.Types.ObjectId; label: string };
	category: { value: string | Schema.Types.ObjectId; label: string };
	paid?: boolean | undefined;
	value: string;
	date: Date;
	paymentForm: string;
	description?: string | undefined;
	type: "income" | "expense";
	occurrences?:
		| "once"
		| "daily"
		| "weekly"
		| "biweekly"
		| "monthly"
		| undefined;
	installment: boolean;
	installmentCurrent?: number | undefined;
	installments?: number | undefined;
	active?: boolean | undefined;

	defineGroupBy(group_by: string | undefined) {
		this.group_by = group_by;
		return this;
	}
	defineActivityId(activity_id: string | undefined) {
		this.activity_id = activity_id;
		return this;
	}
	defineProf(prof: { value: string; label: string } | undefined) {
		this.prof = prof;
		return this;
	}
	defineClient(client: { value: string; label: string } | undefined) {
		this.client = client;
		return this;
	}

	defineProcedures(
		procedures: { value: string; label: string }[] | undefined
	) {
		this.procedures = procedures;
		return this;
	}

	defineInstallmentCurrent(installmentCurrent: number | undefined) {
		this.installmentCurrent = installmentCurrent;
		return this;
	}

	defineType(type: "expense" | "income") {
		this.type = type;
		return this;
	}

	defineBank(bank: { value: string | ObjectId; label: string }) {
		this.bank = bank;
		return this;
	}

	defineUnityId(unity_id: string | undefined) {
		this.unity_id = unity_id;
		return this;
	}

	defineCategory(category: { value: string | ObjectId; label: string }) {
		this.category = category;
		return this;
	}

	defineValue(value: string) {
		this.value = value;
		return this;
	}

	definePaymentForm(value: string) {
		this.paymentForm = value;
		return this;
	}

	defineDate(value: Date) {
		this.date = value;
		return this;
	}

	defineDescription(value?: string) {
		this.description = value;
		return this;
	}

	defineInstallment(value: boolean) {
		this.installment = value;
		return this;
	}

	defineInstallments(value?: number) {
		this.installments = value;
		return this;
	}

	defineCostCenter(cost_center: { value: string | ObjectId; label: string }) {
		this.cost_center = cost_center;
		return this;
	}

	definePaid(paid: boolean | undefined) {
		this.paid = paid;
		return this;
	}

	public static async build(
		values: ITransaction
	): PromiseEither<AbstractError, TransactionEntity> {
		try {
			z.object({
				group_by: z.string().optional(),
				activity_id: z.string().optional(),
				prof: z
					.object({
						value: z.string(),
						label: z.string(),
					})
					.optional(),
				client: z
					.object({
						value: z.string(),
						label: z.string(),
					})
					.optional(),
				procedures: z
					.array(
						z.object({
							value: z.string(),
							label: z.string(),
						})
					)
					.optional(),
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
				value: z.string(),
				date: z.union([z.string(), z.date()]),
				paymentForm: z.string(),
				description: z.string().optional(),
				type: z.enum(["income", "expense"]),
				occurrences: z
					.enum(["once", "daily", "weekly", "biweekly", "monthly"])
					.optional(),
				installment: z.boolean(),
				installmentCurrent: z.number().optional(),
				installments: z.number().optional(),
				active: z.boolean().optional(),
			});

			return right(
				new TransactionEntity()
					.defineBank(values.bank)
					.defineClient(values.client)
					.defineProf(values.prof)
					.defineCostCenter(values.cost_center)
					.defineCategory(values.category)
					.defineGroupBy(values.activity_id)
					.defineActivityId(values.activity_id)
					.defineDate(new Date(values.date))
					.defineValue(values.value)
					.defineUnityId(values.unity_id)
					.definePaymentForm(values.paymentForm)
					.definePaid(values.paid)
					.defineType(values.type)
					.defineProcedures(values.procedures)
					.defineInstallment(values.installment)
					.defineInstallments(values.installments)
					.defineInstallmentCurrent(values.installmentCurrent)
					.defineDescription(values.description)
			);
		} catch (err) {
			console.log(err);
			return left(new AbstractError("Error validating payment", 500));
		}
	}
}
