import type { EventsList } from '@ioc:Adonis/Core/Event';
import {
	SendNewPasswordUseCase,
	SendNewUserUseCase,
} from 'App/Core/domain/use-cases';
import container from 'App/Core/shared/container';
export default class User {
	async onNewUser(user: EventsList['new:user']) {
		const sendNewUser = container.resolve(SendNewUserUseCase)

		return await sendNewUser.execute({
			email: user.email,
			id: user.id,
			name: user.name as string || user.label as string,
		})
	}

	async onNewPassword(user: EventsList['new:password']) {
		const sendNewPassword = container.resolve(SendNewPasswordUseCase)

		return await sendNewPassword.execute({
			email: user.email,
			password: user.password,
		})
	}
}
