import { ROLES } from 'App/Roles/types'
import { describe, expect, it } from 'vitest'
import { CreatePasswordUseCase } from './create-password-use-case'

const makeSut = () => {
	const sut = new CreatePasswordUseCase()

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

		expect(passwordOrErr.isRight()).toBe(true)
		expect(passwordOrErr.extract()).toBe('123456')
	})

	it('should return password if password is not passed', async () => {
		const { sut } = makeSut()

		const passwordOrErr = await sut.execute({ email: 'any_email', type: ROLES.ADMIN })

		expect(passwordOrErr.isRight()).toBe(true)

		if (passwordOrErr.isLeft()) {
			throw new Error('Should not be left')
		}

		expect(passwordOrErr.extract().length).toBe(6)
	})
})
