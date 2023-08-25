// Decorador de função
import { Either } from 'App/Core/shared'
import { ROLES } from 'App/Roles/types'
import Mail from '../entity/mail'

const roles = [ROLES.PROF, ROLES.SEC]

export default function SendPasswordEmail(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const originalMethod = descriptor.value

	descriptor.value = async function (...args: any[]) {
		const result: Either<any, any> = await originalMethod.apply(this, args)

		if (result.isLeft() || process.env.NODE_ENV !== 'production') {
			return result
		}
		const user = args[0]

		// Se o tipo do usuário não for um dos tipos que devem receber o email, não envia o email
		if (!roles.includes(user.type)) {
			return result
		}

		const EDGE = (await import('../constants/edge')).default
		const password = result.extract()

		await Promise.all([
			await Mail.send({
				props: {
					password: password,
				},
				edge: EDGE.create_password,
				email: user.email,
				title: 'Ative sua conta na DPSystem',
			}),
		])

		return result
	}

	return descriptor
}
