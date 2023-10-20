import { EnvMock, LoggerMock, MailMock } from '__mocks__'
import { describe, expect, it } from 'vitest'
import {
	SendEmailUseCase
} from './send-use-case'

const makeSutSendEmail = () => {
	const sut = new SendEmailUseCase(
		new LoggerMock(),
		new EnvMock(),
		new MailMock()
	)
	return { sut }
}

describe('Use cases - Send Email Use Case (Only)', () => {
	it('should send email', async () => {
		const { sut } = makeSutSendEmail()
		const respOrErr = await sut.execute({
			edge: 'edge',
			props: {},
			email: 'email',
			title: 'title'
		})

		expect(respOrErr.isRight()).toBeTruthy()
	})
})
