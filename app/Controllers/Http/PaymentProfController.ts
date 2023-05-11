/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import { makeCreatePaymentProfComposer } from "App/Core/composers/payment-prof/make-create-payment-prof-composer";
import { makeDeletePaymentProfByIdComposer } from "App/Core/composers/payment-prof/make-delete-payment-prof-by-id-composer";
import { makeFindAllPaymentProfsComposer } from "App/Core/composers/payment-prof/make-find-all-payment-profs-composer";
import { makeFindPaymentProfByIdComposer } from "App/Core/composers/payment-prof/make-find-payment-prof-by-id-composer";
import { makeUpdatePaymentProfByIdComposer } from "App/Core/composers/payment-prof/make-update-payment-prof-by-id-composer";

("use strict");

class PaymentProfController {
	async findAllPaymentProfs(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllPaymentProfsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findPaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeFindPaymentProfByIdComposer(), ctx);
	}

	async deletePaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeDeletePaymentProfByIdComposer(), ctx);
	}

	async createPaymentProf(ctx: HttpContextContract) {
		return adaptRoute(makeCreatePaymentProfComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async updatePaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdatePaymentProfByIdComposer(), ctx);
	}
}

module.exports = PaymentProfController;
