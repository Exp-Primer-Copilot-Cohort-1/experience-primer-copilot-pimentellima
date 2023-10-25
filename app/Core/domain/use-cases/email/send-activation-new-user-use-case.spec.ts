import { SendEmailError } from 'App/Core/domain/errors/send-email.err'
import { SendActivationNewUserUseCase } from 'App/Core/domain/use-cases/email/send-activation-new-user-use-case'
import { left, right } from 'App/Core/shared'
import { encrypt } from 'App/Helpers/encrypt'
import { EnvMock, LoggerMock, MailMock } from '__mocks__'
import { describe, expect, it, vi } from 'vitest'
import { SendEmailUseCase } from './send-email-use-case'

const EDGE = {
	confirm: 'emails/confirm',
}

const makeSutSendActivationNewUser = () => {
	const mail = new MailMock()
	const env = new EnvMock()
	const mailSpy = vi.spyOn(mail, 'send')
	const envSpy = vi.spyOn(env, 'get').mockImplementation((key: string) => {
		if (key === 'URL') return 'http://localhost:5173'
		return ''
	})

	const sendEmailUseCaseMock = new SendEmailUseCase(
		new LoggerMock(),
		new EnvMock(),
		new MailMock()
	)

	const spySendEmailUseCase = vi.spyOn(sendEmailUseCaseMock, 'execute')

	const sut = new SendActivationNewUserUseCase(
		sendEmailUseCaseMock,
		env,
		new LoggerMock()
	)

	return {
		sut,
		spy: {
			mail: mailSpy,
			env: envSpy,
			sendEmailUseCase: spySendEmailUseCase
		}
	}
}

const email = 'test@test.com'
const id = '1'
const name = 'Test User'
const URL = 'http://localhost:5173'

describe('Use cases - Send Activation New User Use Case (Unit)', () => {
	it('should send activation email', async () => {
		const { sut, spy } = makeSutSendActivationNewUser()

		const encodeId = await encrypt(JSON.stringify({
			id: id.toString(),
			email: email,
		}))

		const expectedProps = {
			site_activation: `${URL}/account-activation/${encodeId}`,
			label: name,
		}

		spy.sendEmailUseCase.mockResolvedValueOnce(right({ message: 'Email sent successfully' }))

		const respOrErr = await sut.execute({ email, id, name })

		expect(respOrErr.isRight()).toBeTruthy()
		expect(respOrErr.extract()).toEqual({ message: 'Email enviado com sucesso' })



		expect(spy.env).toHaveBeenCalledWith('URL')

		expect(spy.sendEmailUseCase).toHaveBeenCalledWith({
			edge: EDGE.confirm,
			props: expectedProps,
			email: email,
			title: 'Ative sua conta na DPSystem',
		})
	})

	it('should not send activation email and return error', async () => {
		const { sut, spy } = makeSutSendActivationNewUser()

		const encodeId = await encrypt(JSON.stringify({
			id: id.toString(),
			email: email,
		}))

		const expectedProps = {
			site_activation: `${URL}/account-activation/${encodeId}`,
			label: name,
		}

		spy.sendEmailUseCase.mockResolvedValueOnce(left(new SendEmailError()))

		const respOrErr = await sut.execute({ email, id, name })

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(SendEmailError)

		expect(spy.env).toHaveBeenCalledWith('URL')

		expect(spy.sendEmailUseCase).toHaveBeenCalledWith({
			edge: EDGE.confirm,
			props: expectedProps,
			email: email,
			title: 'Ative sua conta na DPSystem',
		})
	})

	it('should retry sending activation email and return success', async () => {
		const { sut, spy } = makeSutSendActivationNewUser()

		const encodeId = await encrypt(JSON.stringify({
			id: id.toString(),
			email: email,
		}))

		const expectedProps = {
			site_activation: `${URL}/account-activation/${encodeId}`,
			label: name,
		}

		spy.sendEmailUseCase.mockRejectedValueOnce(new Error('Error sending email'))
		spy.sendEmailUseCase.mockResolvedValueOnce(right({ message: 'Email sent successfully' }))

		const respOrErr = await sut.execute({ email, id, name })

		expect(spy.env).toHaveBeenCalledWith('URL')
		expect(respOrErr.isRight()).toBeTruthy()
		expect(respOrErr.extract()).toEqual({ message: 'Email enviado com sucesso' })


		expect(spy.sendEmailUseCase).toHaveBeenCalledWith({
			edge: EDGE.confirm,
			props: expectedProps,
			email: email,
			title: 'Ative sua conta na DPSystem',
		})

		expect(spy.sendEmailUseCase).toHaveBeenCalledTimes(2)
	})
})