import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Either } from 'App/Core/shared'

const isTest = process.env.NODE_ENV === 'test'
type KeysEvents = keyof EventsList

export default function EmitEventDecorator(event: KeysEvents, all_attrs = false) {
	return (
		_target,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor => {
		const originalMethod = descriptor.value

		if (isTest) return descriptor

		descriptor.value = async function (...args: [HttpContextContract]) {
			try {
				const result: Either<any, any> = await originalMethod.apply(this, args)

				if (result.isLeft()) return result

				const arg = all_attrs ? {
					...args[0],
					...result.extract()
				} : result.extract()

				Event.emit(event, arg)

				return result
			} catch (error) {
				console.log(error)
			}
		}
		return descriptor
	}
}
