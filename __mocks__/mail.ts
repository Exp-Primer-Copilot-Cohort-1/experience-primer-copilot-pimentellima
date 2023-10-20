import { IMail } from "App/Core/infra/infra"

export class MailMock implements IMail {
	async send(_message: any) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					message: 'Email enviado com sucesso'
				})
			}, 1000)
		})
	}
}