import Env from '@ioc:Adonis/Core/Env';
import type { EventsList } from '@ioc:Adonis/Core/Event';
import { base64 } from '@ioc:Adonis/Core/Helpers';
import logger from 'App/Core/infra/logger';
import EDGE from 'App/Mail/constants/edge';
import Mail from 'App/Mail/entity/mail';
import { retry } from 'ts-retry-promise';
export default class User {
	async onNewUser(user: EventsList['new:user']) {
		const encodeId = base64.encode(user.id)
		const promiseSendConfirm = retry(async () => Mail.send({
			edge: EDGE.confirm,
			props: {
				site_activation: `${Env.get('URL')}/account-activation/${encodeId}`,
				label: user.label || user.name,
			},
			email: user.email,
			title: 'Ative sua conta na DPSystem',
		})
			, {
				logger: (msg) => logger.emit(msg),
				retries: 5
			})

		const promiseSendNewAccount = retry(async () => Mail.send({
			edge: EDGE.new_account,
			props: { user_email: user.email },
			title: 'Um novo cadastro',
			email: Env.get('SMTP_USERNAME'),
		})
			, {
				logger: (msg) => logger.emit(msg),
				retries: 5
			})

		await Promise.all([
			promiseSendConfirm,
			promiseSendNewAccount
		])
	}

	async onNewPassword(user: EventsList['new:password']) {
		const promiseSendPassword = retry(async () => await Mail.send({
			props: {
				password: user.password,
			},
			edge: EDGE.create_password,
			email: user.email,
			title: 'Ative sua conta na DPSystem',
		}),
			{
				logger: (msg) => logger.emit(msg),
				retries: 5
			})

		await Promise.all([
			promiseSendPassword
		])
	}
}
