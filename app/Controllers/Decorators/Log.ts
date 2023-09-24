import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import collections, { COLLECTIONS_NAMES } from 'App/Models'
import generateCollectionLog from 'App/Models/Log'
import deepCompare from '../../Core/helpers/deep-compare'

export enum ACTION {
	PUT = 'put',
	DELETE = 'delete',
	POST = 'post',
}

function actionCompare(action: ACTION, original = {}, modified = {}) {
	switch (action) {
		case ACTION.POST:
			return ['Criado', '']
		case ACTION.PUT:
			return deepCompare(original, modified)
		case ACTION.DELETE:
			return ['Deletado', '']
	}
}

async function getOriginalDoc(
	action: ACTION,
	_id: string,
	collectionName: COLLECTIONS_NAMES,
) {
	const collection = collections[collectionName]
	if (action === ACTION.PUT) {
		return (await collection.findById?.(_id))?.toObject()
	}

	return {}
}

function getCollectionId(body: any, _id: string) {
	return body?.participation_id?.toString() || body?._id?.toString() || _id?.toString()
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

			try {
				const [original, modified] = actionCompare(action, docOriginal, body)
				const collection_id = getCollectionId(body, _id)
				await Log.create({
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
