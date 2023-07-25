import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreatePaymentProfComposer } from 'App/Core/composers/payment-prof/make-create-payment-prof-composer'
import { makeDeletePaymentProfByIdComposer } from 'App/Core/composers/payment-prof/make-delete-payment-prof-by-id-composer'
import { makeFindAllPaymentProfsComposer } from 'App/Core/composers/payment-prof/make-find-all-payment-profs-composer'
import { makeFindPaymentProfByIdComposer } from 'App/Core/composers/payment-prof/make-find-payment-prof-by-id-composer'
import { makeUpdatePaymentProfByIdComposer } from 'App/Core/composers/payment-prof/make-update-payment-prof-by-id-composer'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'

class PaymentProfController {
	async findAllPaymentProfs(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())
		return adaptRoute(makeFindAllPaymentProfsComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findPaymentProfById(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())
		return adaptRoute(makeFindPaymentProfByIdComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async deletePaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeDeletePaymentProfByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async createPaymentProf(ctx: HttpContextContract) {
		return adaptRoute(makeCreatePaymentProfComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updatePaymentProfById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdatePaymentProfByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default PaymentProfController
