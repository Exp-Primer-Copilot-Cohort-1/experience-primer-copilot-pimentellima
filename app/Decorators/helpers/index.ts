import deepCompare from 'App/Core/helpers/deep-compare'
import collections, { COLLECTIONS_NAMES } from 'App/Models'

export enum ACTION {
	PUT = 'put',
	DELETE = 'delete',
	POST = 'post',
}

export function actionCompare(action: ACTION, original = {}, modified = {}) {
	switch (action) {
		case ACTION.POST:
			return ['Criado', '']
		case ACTION.PUT:
			return deepCompare(original, modified)
		case ACTION.DELETE:
			return ['Deletado', '']
	}
}

export async function getOriginalDoc(
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

export function getCollectionId(body: any, _id: string) {
	return body?.group_id?.toString
		|| body?.participation_id?.toString()
		|| body?._id?.toString()
		|| _id?.toString()
}
