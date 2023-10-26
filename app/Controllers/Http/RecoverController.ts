import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeSendRecoveryEmailComposer } from 'App/Core/composers/recovery/make'

class RecoverController {
	async sendRecoveryEmail(ctx: HttpContextContract) {
		return adaptRoute(makeSendRecoveryEmailComposer(), ctx)
	}
}
export default RecoverController
