import MailAdonis from '@ioc:Adonis/Addons/Mail';
import { LOGO } from 'App/Core/infra/constants';
import { IMail } from './infra';

export class Mail implements IMail {
	async send({ from, email, title, edge, props }) {
		return await MailAdonis.send((message) => {
			message.embed(LOGO, 'logo')
			message
				.from(from, 'DP System')
				.to(email)
				.subject(title)
				.htmlView(edge, props)
		})
	}
}