import { SendEmailError } from 'App/Core/domain/errors/send-email.err'
import { EnvMock, LoggerMock, MailMock } from '__mocks__'
import { describe, expect, it, vi } from 'vitest'
import {
	SendEmailUseCase
} from './send-email-use-case'

const makeSutSendEmail = () => {
	const mail = new MailMock()
	const env = new EnvMock()
	const mailSpy = vi.spyOn(mail, 'send')
	const envSpy = vi.spyOn(env, 'get')

	const sut = new SendEmailUseCase(
		new LoggerMock(),
		env,
		mail
	)
	return {
		sut,
		spy: {
			mail: mailSpy,
			env: envSpy
		}
	}
}

describe('Use cases - Send Email Use Case (Unit)', () => {
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

	it('should not send email and return error', async () => {
		const { sut, spy } = makeSutSendEmail()

		spy.mail.mockImplementationOnce(() => {
			throw new Error('Error')
		})

		const respOrErr = await sut.execute({
			edge: 'edge',
			props: {},
			email: 'email',
			title: 'title'
		})

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(SendEmailError)
	})

	it('should send email with correct params', async () => {
		const { sut, spy } = makeSutSendEmail()
		const respOrErr = await sut.execute({
			edge: 'edge',
			props: {},
			email: 'email',
			title: 'title'
		})

		expect(spy.env).toHaveBeenCalledWith('SMTP_USERNAME')
		expect(respOrErr.isRight()).toBeTruthy()
		expect(spy.mail).toHaveBeenCalledWith({
			from: expect.any(String),
			email: 'email',
			title: 'title',
			edge: 'edge',
			props: {}
		})
	})
})
