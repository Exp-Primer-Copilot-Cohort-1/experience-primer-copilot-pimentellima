// Decorador de função
import { Either } from 'App/Core/shared'
import Mail from '../entity/mail'

export default function SendEmailSignUpConfirm(
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
		const Env = (await import('@ioc:Adonis/Core/Env')).default

		const user = result.extract()

		await Promise.all([
			Mail.send({
				edge: EDGE.confirm,
				props: {
					site_activation: `${Env.get('URL')}/account-activation/${user.id}`,
					label: user.label || user.name,
				},
				email: user.email,
				title: 'Ative sua conta na DPSystem',
			}),
			Mail.send({
				edge: EDGE.new_account,
				props: { user_email: user.email },
				title: 'Um novo cadastro',
				email: Env.get('SMTP_USERNAME'),
			}),
		])

		return result
	}

	return descriptor
}
