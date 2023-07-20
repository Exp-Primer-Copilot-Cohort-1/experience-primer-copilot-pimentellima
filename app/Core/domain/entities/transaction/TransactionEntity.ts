import { ObjectId } from "@ioc:Mongoose";
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Account from "App/Models/Account";
import CostCenter from "App/Models/CostCenter";
import FinancialCategory from "App/Models/FinancialCategory";
import { ITransaction } from "Types/ITransaction";
import { Schema } from "mongoose";
import * as z from "zod";

export class TransactionEntity implements ITransaction {
    group_by?: string | undefined;
    activity_id?: string | undefined;
    prof: { value: string; label: string; };
    client: { value: string; label: string; };
    procedures: { value: string; label: string; }[];
    bank: { value: string | Schema.Types.ObjectId; label: string; };
    cost_center: { value: string | Schema.Types.ObjectId; label: string; };
    category: { value: string | Schema.Types.ObjectId; label: string; };
    paid?: boolean | undefined;
    value: string;
    date: string | Date;
    paymentForm: string;
    description?: string | undefined;
    type?: "expense" | "income" | undefined;
    occurrences?: "once" | "daily" | "weekly" | "biweekly" | "monthly" | undefined;
    installment: boolean;
    installmentCurrent?: number | undefined;
    installments?: number | undefined;
    active?: boolean | undefined;
	
    defineGroupBy(group_by: string | undefined) {
        this.group_by = group_by
        return this
    }
    defineActivityId(activity_id: string) {
        this.activity_id = activity_id
        return this
    }
    defineProf(prof: { value: string, label: string }) {
        this.prof = prof
        return this
    }
    defineClient(client: { value: string, label: string }) {
        this.client = client
        return this
    }

	defineInstallmentCurrent(installmentCurrent: number | undefined) {
		this.installmentCurrent = installmentCurrent;
		return this;
	}

	defineType(type: "expense" | "income" | undefined) {
		this.type = type;
		return this;
	}

	defineBank(bank: { value: string | ObjectId; label: string }) {
		this.bank = bank;
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

	public static async build(values: {
		activityId: string;
		bankAccountId: string;
		costCenterId: string;
		categoryId: string;
		paymentDate: Date;
		paymentForm: string;
		type?: "expense" | "income";
		installment: boolean;
		installmentCurrent?: number;
		installments?: number;
		value: string;
		description?: string;
	}): PromiseEither<AbstractError, TransactionEntity> {
		try {
			z.object({
				bankAccountId: z.string(),
				type: z.enum(["expense", "income"]).optional(),
				installmentNumber: z.number().optional(),
				paymentDate: z.date(),
				paymentForm: z.string(),
				installment: z.boolean(),
				installmentsNumber: z.number().optional(),
				installmentsCurrent: z.number().optional(),
				value: z.string(),
				description: z.string().optional(),
			}).parse(values);

			const bank = await Account.findById(values.bankAccountId);
			const costCenter = await CostCenter.findById(values.costCenterId);
			const category = await FinancialCategory.findById(
				values.categoryId
			);
			if (!bank || !category || !costCenter)
				return left(new AbstractError("Internal error", 500));

			return right(
				new TransactionEntity()
					.defineBank({
						value: values.bankAccountId,
						label: bank.bank,
					})
					.defineCostCenter({
						value: values.costCenterId,
						label: costCenter.name,
					})
					.defineCategory({
						value: values.categoryId,
						label: category.name,
					})
                    .defineGroupBy(values.activityId)
					.defineActivityId(values.activityId)
					.defineDate(values.paymentDate)
					.defineValue(values.value)
					.definePaymentForm(values.paymentForm)
					.defineType(values.type)
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
