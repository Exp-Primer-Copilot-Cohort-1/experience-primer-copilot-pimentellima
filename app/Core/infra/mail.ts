import MailAdonis, { MessageComposeCallback } from '@ioc:Adonis/Addons/Mail';
import { IMail } from './infra';

export class Mail implements IMail {
	async send(message: MessageComposeCallback) {
		return await MailAdonis.send(message)
	}
}