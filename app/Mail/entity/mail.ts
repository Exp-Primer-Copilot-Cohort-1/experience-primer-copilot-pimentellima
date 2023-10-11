import type { EdgeValues } from '../constants/edge'
// tipagem que extrai os values de EDGE

type MailParams = {
	edge: EdgeValues
	props: object
	email: string
	title: string
}

const isProd = process.env.NODE_ENV === 'production'

class MailEntity {
	private readonly from: string = 'ti@dpsystem.com.br'

	constructor() { }

	async send({ edge, props, email, title }: MailParams) {
		try {
			if (isProd) return

			const Application = (await import('@ioc:Adonis/Core/Application')).default
			const Mail = (await import('@ioc:Adonis/Addons/Mail')).default
			const Logger = (await import('@ioc:Adonis/Core/Logger')).default

			const logo = Application.publicPath('logo.png')
			await Mail.send((message) => {
				message.embed(logo, 'logo')
				message
					.from(this.from, 'DP System')
					.to(email)
					.subject(title)
					.htmlView(edge, props)
			})
			Logger.info(`Email enviado para ${email}`)
		} catch (error) {

			const Logger = (await import('@ioc:Adonis/Core/Logger')).default
			Logger.error(error)
		}
	}
}

const mailEntity = new MailEntity()

export default mailEntity
