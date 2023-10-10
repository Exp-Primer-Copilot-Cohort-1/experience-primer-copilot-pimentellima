import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CurrentNotSmallerError } from 'App/Core/domain/errors/current-not-smaller-error'
import { AbstractError } from 'App/Core/errors/error.interface'
import { Either } from 'App/Core/shared'

const isTest = process.env.NODE_ENV === 'test'
type KeysEvents = keyof EventsList

function verifyWhiteListLefts(item: Either<AbstractError, unknown>) {
	const whiteListLefts = [
		CurrentNotSmallerError.name,
	]

	if (item.isRight()) return true

	const error = item.extract()

	return whiteListLefts.includes(error.name)
}



export default function EmitEventDecorator(
	event: KeysEvents,
	all_attrs: boolean = false,
) {
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

				const hasErrorPermission = verifyWhiteListLefts(result)

				if (!hasErrorPermission) return result

				const arg = all_attrs ? {
					...args[0],
					...result.extract()
				} : result.extract()


				await Event.emit(event, arg)

				return result
			} catch (error) {
				console.log(error)
			}
		}
		return descriptor
	}
}
