import { faker } from '@faker-js/faker'
import { ROLES } from 'App/Roles/types'
import { IUser } from 'App/Types/IUser'
import { cpf } from 'cpf-cnpj-validator'
import { describe, expect, it } from 'vitest'
import { CreateSessionUseCase } from './create-session-use-case'

class Auth {
	private user: IUser = {
		_id: '1',
		name: 'test',
		email: 'test@hotmail.com',
		password: '123456',
		active: true,
		avatar: faker.image.avatar(),
		celphone: faker.phone.number(),
		created_at: new Date(),
		document: cpf.generate(),
		due_date: new Date().toISOString(),
		exib_minutes: 0,
		hour_end: '00:00',
		hour_end_lunch: '00:00',
		hour_start: '00:00',
		hour_start_lunch: '00:00',
		is_friday: faker.datatype.boolean(),
		is_monday: faker.datatype.boolean(),
		is_saturday: faker.datatype.boolean(),
		is_sunday: faker.datatype.boolean(),
		is_thursday: faker.datatype.boolean(),
		is_tuesday: faker.datatype.boolean(),
		is_wednesday: faker.datatype.boolean(),
		lunch_time_active: faker.datatype.boolean(),
		schedule_obs: faker.lorem.paragraph(),
		show_lack: faker.datatype.boolean(),
		type: ROLES.ADMIN,
		unity_id: '1',
		updated_at: new Date(),
	}

	constructor(user?: any) {
		if (user) this.user = user
	}

	defineUser(user: any) {
		this.user = user
	}

	use(a: any): this {
		return this
	}

	public async attempt(email: string, password: string) {
		if (email !== this.user.email || password !== this.user.password) {
			throw new Error('Invalid credentials')
		}

		return {
			user: this.user,
			type: 'test',
		}
	}

	logout() {
		return this
	}
}

const makeSut = () => {
	const auth = new Auth() as any
	const sut = new CreateSessionUseCase(auth)

	return {
		auth,
		sut,
	}
}

describe('Create Session Use Case (Unit)', () => {
	it('should call auth attempt with correct values', async () => {
		const { sut } = makeSut()

		const result = await sut.execute({ email: 'test@hotmail.com', password: '123456' })

		expect(result.isRight()).toBeTruthy()
	})

	it('should return InvalidCredentialsError if auth attempt throws', async () => {
		const { sut } = makeSut()

		const result = await sut.execute({ email: 'invalid', password: 'invalid' })

		expect(result.isLeft()).toBeTruthy()
	})

	it('should return left if SessionUser.build throws', async () => {
		const { sut, auth } = makeSut()

		auth.defineUser({
			email: 'test@hotmail.com',
			password: '123456',
		})

		const result = await sut.execute({ email: 'test@hotmail.com', password: '123456' })

		expect(result.isLeft()).toBeTruthy()
	})
})
