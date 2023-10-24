import { ISession, UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { left, right } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { describe, expect, it, vi } from 'vitest'
import { Credentials } from '../../helpers/credentials'
import { SignInUseCase } from './sign-in-use-case'

class CreateSessionMock implements UseCase<Credentials, ISession> {
	execute = vi.fn().mockResolvedValue(right({
		user: {
			unity_id: '123'
		},
		token: {
			token: '123',
			type: 'bearer',
		}
	} as ISession))
}

class UnityValidationMock implements UseCase<IUnity, IUnity> {
	execute = vi.fn().mockResolvedValue(right({} as IUnity))
}

class UnitiesManagerMock implements UnitiesManagerContract {
	create = vi.fn().mockResolvedValue(right({} as IUnity))
	deleteById = vi.fn().mockResolvedValue(right({} as IUnity))
	findById = vi.fn().mockResolvedValue(right({} as IUnity))
	update = vi.fn().mockResolvedValue(right({} as IUnity))
	findAll = vi.fn().mockResolvedValue(right([] as IUnity[]))
	findByName = vi.fn().mockResolvedValue(right({} as IUnity))
	findOne = vi.fn().mockResolvedValue(right({} as IUnity))
}

const makeSut = () => {
	const sessionManagerMock = new CreateSessionMock()
	const unitiesManagerMock = new UnitiesManagerMock()
	const unityValidationMock = new UnityValidationMock()

	const sut = new SignInUseCase(
		sessionManagerMock,
		unitiesManagerMock,
		unityValidationMock
	)

	return {
		sut,
		sessionManagerMock,
		unitiesManagerMock,
		unityValidationMock
	}
}

describe('Sign In Use Case (Unit)', () => {
	it('should return an error if session creation fails', async () => {
		const { sut, sessionManagerMock } = makeSut()

		sessionManagerMock.execute.mockResolvedValueOnce(left(new Error('Session creation failed')))

		const result = await sut.execute({ email: 'test@test.com', password: '123456' })

		if (result.isRight()) {
			throw new Error('Should not return a right value')
		}

		expect(result.isLeft()).toBe(true)
		expect(result.extract()).toBeInstanceOf(Error)
		expect(result.extract().message).toBe('Session creation failed')
	})

	it('should return an error if unity is not found', async () => {
		const { sut, unitiesManagerMock } = makeSut()

		unitiesManagerMock.findById.mockResolvedValueOnce(left(new Error('Unity not found')))

		const result = await sut.execute({ email: 'test@test.com', password: '123456' })
		if (result.isRight()) {
			throw new Error('Should not return a right value')
		}
		expect(result.isLeft()).toBe(true)
		expect(result.extract()).toBeInstanceOf(Error)
		expect(result.extract().message).toBe('Unity not found')
	})

	it('should return an error if unity validation fails', async () => {
		const { sut, unityValidationMock } = makeSut()

		unityValidationMock.execute.mockResolvedValueOnce(left(new Error('Unity validation failed')))

		const result = await sut.execute({ email: 'test@test.com', password: '123456' })
		if (result.isRight()) {
			throw new Error('Should not return a right value')
		}
		expect(result.isLeft()).toBe(true)
		expect(result.extract()).toBeInstanceOf(Error)
		expect(result.extract().message).toBe('Unity validation failed')
	})

	it('should return a session if everything succeeds', async () => {
		const { sut } = makeSut()

		const result = await sut.execute({ email: 'test@test.com', password: '123456' })

		expect(result.isRight()).toBeTruthy()
		expect(result.extract()).toBeInstanceOf(Object)
		expect(result.extract()).toHaveProperty('user')
		expect(result.extract()).toHaveProperty('token')
	})
})
