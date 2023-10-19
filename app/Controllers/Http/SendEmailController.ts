import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeResendActivationComposer } from 'App/Core/composers/emails/make'

class SendEmailController {
	async resend(ctx: HttpContextContract) {
		return adaptRoute(makeResendActivationComposer(), ctx)
	}
}
export default SendEmailController
