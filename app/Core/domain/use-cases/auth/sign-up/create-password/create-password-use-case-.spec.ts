import { EventEmitterTest } from 'App/Core/infra/event-emitter'
import { ROLES } from 'App/Roles/types'
import { describe, expect, it } from 'vitest'
import { CreatePasswordUseCase } from './create-password-use-case'

const makeSut = () => {
	const sut = new CreatePasswordUseCase(
		new EventEmitterTest()
	)

	return { sut }
}

describe('CreatePasswordUseCase (Unit)', () => {
	it('should return password if password is passed', async () => {
		const { sut } = makeSut()

		const passwordOrErr = await sut.execute({
			email: 'any_email',
			password: '123456',
			type: ROLES.ADMIN,
		})

		if (passwordOrErr.isLeft()) {
			throw new Error('Should not be left')
		}

		expect(passwordOrErr.isRight()).toBe(true)
		expect(passwordOrErr.extract().password).toBe('123456')
	})

	it('should return password if password is not passed', async () => {
		const { sut } = makeSut()

		const passwordOrErr = await sut.execute({ email: 'any_email', type: ROLES.ADMIN })

		expect(passwordOrErr.isRight()).toBe(true)

		if (passwordOrErr.isLeft()) {
			throw new Error('Should not be left')
		}

		expect(passwordOrErr.extract().password.length).toBe(6)
	})
})
