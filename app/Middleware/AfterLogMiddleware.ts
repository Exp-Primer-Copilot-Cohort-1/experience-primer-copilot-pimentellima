import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import generateCollectionLog from 'App/Models/Log'

const documents = ['rg', 'document', 'cnh', 'titulo_eleitor', 'passaporte']

function deepCompare(before, after, seen = new Map()) {
	const originalChanges = {}
	const modifiedChanges = {}

	const allKeys = new Set([...Object.keys(before), ...Object.keys(after)])

	for (const key of allKeys) {
		const beforeExists = before.hasOwnProperty(key)
		const afterExists = after.hasOwnProperty(key)

		if (
			beforeExists &&
			afterExists &&
			typeof before[key] === 'object' &&
			before[key] !== null &&
			typeof after[key] === 'object' &&
			after[key] !== null
		) {
			// Se já comparamos esses objetos antes, evite a recursão
			const cachedResult = seen.get(before[key])
			if (cachedResult) {
				if (cachedResult !== after[key]) {
					originalChanges[key] = before[key]
					modifiedChanges[key] = after[key]
				}
				continue
			}

			seen.set(before[key], after[key])

			const [originalNested, modifiedNested] = deepCompare(
				before[key],
				after[key],
				seen,
			)
			if (Object.keys(originalNested).length > 0) {
				originalChanges[key] = originalNested
				modifiedChanges[key] = modifiedNested
			}
		} else if (
			(beforeExists && !afterExists) ||
			(!beforeExists && afterExists) ||
			before[key] !== after[key]
		) {
			if (beforeExists) {
				originalChanges[key] = before[key]
			}
			if (afterExists) {
				modifiedChanges[key] = after[key]
			}

			try {
				if (documents.includes(key)) {
					if (beforeExists) {
						originalChanges[key] = encrypt(before[key])
					}
					if (afterExists) {
						modifiedChanges[key] = encrypt(after[key])
					}
				}
			} catch (error) { }
		}
	}

	return [originalChanges, modifiedChanges]
}

export default class LogMiddleware {
	public async handle(
		{ response, request, auth, logger }: HttpContextContract,
		next: () => Promise<void>,
	) {
		await next()
		// code for middleware goes here. ABOVE THE NEXT CALL
		const user = auth.user
		const unity_id = user?.unity_id

		const METHOD = request.method()

		const Logger = await generateCollectionLog(unity_id?.toString() as string)
		const before = request.body()
		const after = response.getBody()

		try {
			if (METHOD === 'POST') {
				await Logger.create({
					action: 'post',
					date: new Date().toISOString(),
					modified: '',
					original: 'Criado',
					unity_id: unity_id?.toString(),
					user: user?._id,
					collection_id: after._id,
				})
			}

			// if (METHOD === 'PUT') {
			// 	const [originalChanges, modifiedChanges] = deepCompare(before, after)

			// 	await Logger.create({
			// 		action: 'post',
			// 		date: new Date().toISOString(),
			// 		modified: modifiedChanges,
			// 		original: originalChanges,
			// 		unity_id: unity_id?.toString(),
			// 		user: user?._id,
			// 		collection_id: after._id,
			// 	})
			// }
		} catch (error) {
			logger.error(error)
		}
	}
}
