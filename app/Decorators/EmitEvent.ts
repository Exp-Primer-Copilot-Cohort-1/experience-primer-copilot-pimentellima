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

	if (item.isLeft()) {
		const error = item.extract()

		if (whiteListLefts.includes(error.constructor.name)) return true
	}

	return false
}

type OptionsEmitEvent = {
	all_attrs?: boolean
	hasEmitterInRight?: boolean
}

export default function EmitEventDecorator(event: KeysEvents, {
	all_attrs = false,
	hasEmitterInRight = true,
}: OptionsEmitEvent = {}) {
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

				if (hasEmitterInRight) Event.emit(event, arg)
				if (hasErrorPermission) Event.emit(event, arg)

				return result
			} catch (error) {
				console.log(error)
			}
		}
		return descriptor
	}
}
