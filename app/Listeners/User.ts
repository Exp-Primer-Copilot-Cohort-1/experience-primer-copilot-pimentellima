import Env from '@ioc:Adonis/Core/Env';
import type { EventsList } from '@ioc:Adonis/Core/Event';
import { base64 } from '@ioc:Adonis/Core/Helpers';
import EDGE from 'App/Mail/constants/edge';
import Mail from 'App/Mail/entity/mail';
export default class User {
	async onNewUser(user: EventsList['new:user']) {
		const encodeId = base64.encode(user.id)

		await Promise.all([
			Mail.send({
				edge: EDGE.confirm,
				props: {
					site_activation: `${Env.get('URL')}/account-activation/${encodeId}`,
					label: user.label || user.name,
				},
				email: user.email,
				title: 'Ative sua conta na DPSystem',
			}),
			Mail.send({
				edge: EDGE.new_account,
				props: { user_email: user.email },
				title: 'Um novo cadastro',
				email: Env.get('SMTP_USERNAME'),
			}),
		])
	}

	async onNewPassword(user: EventsList['new:password']) {
		await Promise.all([
			await Mail.send({
				props: {
					password: user.password,
				},
				edge: EDGE.create_password,
				email: user.email,
				title: 'Ative sua conta na DPSystem',
			}),
		])
	}
}
