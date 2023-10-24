import { EnvMock, EventEmitterMock, LoggerMock, MailMock } from '__mocks__'
import { describe, expect, it } from 'vitest'
import { IdNotProvidedError, UserAlreadyActiveError } from '../../errors'
import { AdminInMemoryRepository } from '../../repositories'
import { CreatePasswordUseCase } from '../auth/sign-up'
import { ResendActivationUseCase } from './resend-activation-use-case'
import { SendActivationNewUserUseCase } from './send-activation-new-user-use-case'
import { SendEmailUseCase } from './send-email-use-case'

const makeSut = () => {
	const sendMail = new SendEmailUseCase(
		new LoggerMock(),
		new EnvMock(),
		new MailMock()
	)

	const sendActivation = new SendActivationNewUserUseCase(
		sendMail,
		new EnvMock(),
		new LoggerMock()
	)

	const createPassword = new CreatePasswordUseCase(
		new EventEmitterMock()
	)
	const manager = new AdminInMemoryRepository()

	const sut = new ResendActivationUseCase(
		sendActivation,
		createPassword,
		manager
	)

	return {
		sut,
		sendActivation,
		createPassword,
		manager
	}
}

describe('Use cases - Resend Activation Use  (Unit)', () => {
	it('should return an error if no id is provided', async () => {
		const { sut } = makeSut()

		const respOrErr = await sut.execute({} as any)

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(IdNotProvidedError)
	})

	it('should return an error if user is already active', async () => {
		const { sut, manager } = makeSut()

		const userOrErr = await manager.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: 'password',
			active: true, // <--ele já está ativo, então não pode reenviar o email
			unity_id: '123'
		} as any)

		if (userOrErr.isLeft()) throw userOrErr.extract()

		const user = userOrErr.extract()

		const respOrErr = await sut.execute({ id: user._id })

		expect(respOrErr.isLeft()).toBeTruthy()
		expect(respOrErr.extract()).toBeInstanceOf(UserAlreadyActiveError)
	})

	it('should send activation email and create password', async () => {
		const { sut, manager } = makeSut()

		const userOrErr = await manager.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: 'password',
			active: false, // <--ele não está ativo, então pode reenviar o email
			unity_id: '123'
		} as any)

		if (userOrErr.isLeft()) throw userOrErr.extract()

		const user = userOrErr.extract()

		const respOrErr = await sut.execute({ id: user._id })

		expect(respOrErr.isRight()).toBeTruthy()
		expect(respOrErr.extract()).toEqual({ message: 'Email enviado com sucesso' })
	})
})