// Decorador de função

import Log from 'App/Models/Log'
import { Either } from '../shared'

function deepCompare(before, after) {
	const originalChanges = {}
	const modifiedChanges = {}

	Object.keys(after).forEach((key) => {
		if (
			typeof before[key] === 'object' &&
			before[key] !== null &&
			typeof after[key] === 'object' &&
			after[key] !== null
		) {
			const [originalNested, modifiedNested] = deepCompare(before[key], after[key])
			if (Object.keys(originalNested).length > 0) {
				originalChanges[key] = originalNested
				modifiedChanges[key] = modifiedNested
			}
		} else if (before[key] !== after[key]) {
			originalChanges[key] = before[key]
			modifiedChanges[key] = after[key]
		}
	})

	return [originalChanges, modifiedChanges]
}

export default function LogDecorator(
	collectionName: string,
	action: 'put' | 'delete' | 'post',
) {
	return (
		_target,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor => {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args) {
			if (process.env.NODE_ENV === 'test') {
				return originalMethod.apply(this, args)
			}
			const db = (await import('@ioc:Mongoose')).default

			const id = args[0]._id || args[0].id

			const props = (await db.model(collectionName).findById(id)) || {}

			let user = args[1]
			const unity_id = user.unity_id

			if (user) {
				user = {
					label: user.name,
					value: user._id,
				}
			}

			const date = new Date().toLocaleString()
			const result: Either<any, any> = await originalMethod.apply(this, args)

			if (result.isLeft()) {
				return result
			}

			const value = result.extract()

			const [before, after] = deepCompare(props, value)

			await Log.create({
				action,
				collection_name: collectionName,
				date,
				before,
				after,
				user,
				collection_id: value._id,
				unity_id: unity_id.toString(),
			})

			return result
		}

		return descriptor
	}
}
