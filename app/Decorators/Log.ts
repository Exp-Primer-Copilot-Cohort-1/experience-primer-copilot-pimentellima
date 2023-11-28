import { COLLECTIONS_NAMES } from 'App/Models'
import generateCollectionLog from 'App/Models/Log'
import { HttpContextContract } from 'App/Types/Adonis'
import { actionCompare, getCollectionId, getOriginalDoc } from './helpers'

export enum ACTION {
	PUT = 'put',
	DELETE = 'delete',
	POST = 'post',
}

export default function LogDecorator(collectionName: COLLECTIONS_NAMES, action: ACTION) {
	return (
		_target,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor => {
		const originalMethod = descriptor.value
		descriptor.value = async function (...args: [HttpContextContract]) {
			const date = new Date().toLocaleString() // Pega a data atual
			const ctx = args[0]
			const { request, response } = ctx

			const _id = request.params().id || request.params()._id
			const docOriginal = await getOriginalDoc(action, _id, collectionName)

			const r = await originalMethod.apply(this, args)

			const unity_id = ctx.auth.user?.unity_id
			const user = ctx.auth.user?._id

			const Log = await generateCollectionLog(unity_id?.toString() as string)

			const body = response.getBody()

			const status = response.getStatus()

			if (status >= 400) return r

			try {
				const [original, modified] = actionCompare(action, docOriginal, body)
				const collection_id = getCollectionId(body, _id)
				await Log?.create({
					action,
					collection_name: collectionName,
					date,
					modified,
					original,
					user,
					collection_id,
					unity_id,
				})
			} catch (error) {
				console.log(error)
			}

			return r
		}
		return descriptor
	}
}
