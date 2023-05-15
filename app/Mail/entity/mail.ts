import Mail from '@ioc:Adonis/Addons/Mail'
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
	private readonly to: string = 'ti@dpsystem.com.br'

	constructor() { }

	async send({ edge, props, email, title }: MailParams) {
		try {
			await Mail.send((message) => {
				message.from(email).to(this.to).subject(title).htmlView(edge, props)
			})
			Logger.info(`Email enviado para ${email}`)
		} catch (error) {
			Logger.error(error)
		}
	}
}

const mailEntity = new MailEntity()

export default mailEntity
