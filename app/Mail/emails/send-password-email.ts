// Decorador de função
import { Either } from 'App/Core/shared'
import Mail from '../entity/mail'

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

		const EDGE = (await import('../constants/edge')).default

		const user = result.extract()

		await Promise.all([
			await Mail.send({
				props: {
					password: user.password,
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
