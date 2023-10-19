import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class SendEmailController {
	async resend(ctx: HttpContextContract) {
		setTimeout(() => {
			console.log('resend')
		}, 5000)
		return ctx.response.status(200).send({ message: 'Email resent' })
	}
}
export default SendEmailController
