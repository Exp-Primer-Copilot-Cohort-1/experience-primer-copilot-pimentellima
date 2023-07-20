import { ObjectId } from "@ioc:Mongoose";
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Account from "App/Models/Account";
import CostCenter from "App/Models/CostCenter";
import FinancialCategory from "App/Models/FinancialCategory";
import { ActivityPayment } from "Types/IActivity";
import { Schema } from "mongoose";
import * as z from "zod";

export class ActivityPaymentEntity implements ActivityPayment {
	bank: { id: string | Schema.Types.ObjectId; name: string };
	cost_center: { id: string | ObjectId; name: string };
	category: { id: string | ObjectId; name: string };
	value: string;
	paymentForm: string;
	date: string;
	description?: string | undefined;
	installment: boolean;
	installments?: number;

	defineBank(values: { id: string | ObjectId; name: string }) {
		this.bank = values;
		return this;
	}

	defineCategory(values: { id: string | ObjectId; name: string }) {
		this.category = values;
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

	defineDate(value: string) {
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

	defineInstallmentsNumber(value?: number) {
		this.installments = value;
		return this;
	}

	defineCostCenter(value: { id: string | ObjectId; name: string }) {
		this.cost_center = value;
		return this;
	}

	public static async build(values: {
		activityId: string;
		bankAccountId: string;
		costCenterId: string;
		categoryId: string;
		paymentDate: string;
		paymentForm: string;
		installment: boolean;
		installmentsNumber?: number;
		value: string;
		description?: string;
	}): PromiseEither<AbstractError, ActivityPaymentEntity> {
		try {
			z.object({
				bankAccountId: z.string(),
				paymentDate: z.string(),
				paymentForm: z.string(),
				installment: z.boolean(),
				installmentsNumber: z.number().optional(),
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
				new ActivityPaymentEntity()
					.defineBank({
						id: values.bankAccountId,
						name: bank.bank,
					})
					.defineCostCenter({
						id: values.costCenterId,
						name: costCenter.name,
					})
					.defineCategory({
						id: values.categoryId,
						name: category.name,
					})
					.defineDate(values.paymentDate)
					.defineValue(values.value)
					.definePaymentForm(values.paymentForm)
					.defineInstallment(values.installment)
					.defineInstallmentsNumber(values.installmentsNumber)
					.defineDescription(values.description)
			);
		} catch (err) {
			console.log(err);
			return left(new AbstractError("Error validating payment", 500));
		}
	}
}
