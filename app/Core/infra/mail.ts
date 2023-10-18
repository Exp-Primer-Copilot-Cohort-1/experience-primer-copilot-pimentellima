import MailAdonis, { MessageComposeCallback } from '@ioc:Adonis/Addons/Mail';

export interface IMail {
	send: (message: MessageComposeCallback) => Promise<any>
}

export class Mail implements IMail {
	async send(message: MessageComposeCallback) {
		return await MailAdonis.send(message)
	}
}