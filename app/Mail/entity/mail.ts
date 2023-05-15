import Mail from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'
import EDGE from '../constants/edge'
// tipagem que extrai os values de EDGE
type EdgeValues = (typeof EDGE)[keyof typeof EDGE]

type MailParams = {
	edge: EdgeValues
	props: object
	email: string
	title: string
}

class MailEntity {
	private readonly from: string = 'ti@dpsystem.com.br'

	constructor() { }

	async send({ edge, props, email, title }: MailParams) {
		try {
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
			console.log(error)
			Logger.error(error)
		}
	}
}

const mailEntity = new MailEntity()

export default mailEntity
