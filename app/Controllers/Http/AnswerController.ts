'use strict'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeUpdateAccountByIdComposer } from 'App/Core/composers/accounts/make-update-account-by-id-composer'
import { makeCreateAnswerComposer } from 'App/Core/composers/answer/make-create-answer-composer'
import { makeDeleteAnswerByIdComposer } from 'App/Core/composers/answer/make-delete-answer-by-id-composer'
import { makeFindAllAnswersComposer } from 'App/Core/composers/answer/make-find-all-answers-composer'
import { makeFindAnswerByIdComposer } from 'App/Core/composers/answer/make-find-answer-by-id-composer'
import { makeFindAnswersByClientIdComposer } from 'App/Core/composers/answer/make-find-answers-by-client-id-composer'
import { makeFindAnswersByFormIdComposer } from 'App/Core/composers/answer/make-find-answers-by-form-id-composer'

class AnswerController {
	async findAllAnswers(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllAnswersComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAnswersByFormId(ctx: HttpContextContract) {
		return adaptRoute(makeFindAnswersByFormIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAnswersByClientId(ctx: HttpContextContract) {
		return adaptRoute(makeFindAnswersByClientIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async createAnswer(ctx: HttpContextContract) {
		return adaptRoute(makeCreateAnswerComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAnswerById(ctx: HttpContextContract) {
		return adaptRoute(makeFindAnswerByIdComposer(), ctx)
	}

	async deleteAnswerById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteAnswerByIdComposer(), ctx)
	}

	async updateAnswerById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateAccountByIdComposer(), ctx)
	}
}

export default AnswerController
