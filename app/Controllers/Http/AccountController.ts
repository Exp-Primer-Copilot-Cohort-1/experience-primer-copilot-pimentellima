import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAccountComposer } from 'App/Core/composers/accounts/make-create-account-composer'
import { makeDeleteAccountComposer } from 'App/Core/composers/accounts/make-delete-account-composer'
import { makeFindAccountComposer } from 'App/Core/composers/accounts/make-find-account-by-id-composer'
import { makeFindAllAccountsComposer } from 'App/Core/composers/accounts/make-find-all-accounts-composer'
import { makeUpdateAccountByIdComposer } from 'App/Core/composers/accounts/make-update-account-by-id-composer'

class AccountController {
	async findAllAccounts(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllAccountsComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAccountById(ctx: HttpContextContract) {
		return adaptRoute(makeFindAccountComposer(), ctx)
	}

	async updateAccount(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateAccountByIdComposer(), ctx)
	}

	async deleteAccountById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteAccountComposer(), ctx)
	}

	async createAccount(ctx: HttpContextContract) {
		return adaptRoute(makeCreateAccountComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default AccountController
