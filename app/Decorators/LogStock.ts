import generateCollectionLog from 'App/Models/Log'
import { COLLECTION_NAME } from 'App/Models/Procedure'
import { HttpContextContract } from 'App/Types/Adonis'
import { StockProcedure } from 'App/Types/ITransaction'
import { ACTION, getCollectionId } from './helpers'


export default function LogStock(
	type: ACTION = ACTION.PUT,
) {
	return (
		_target,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor => {
		const originalMethod = descriptor.value
		descriptor.value = async function (...args: [HttpContextContract]) {
			const date = new Date().toLocaleString() // Pega a data atual
			const ctx = args[0]
			const ip = ctx.request?.ip() || ctx.request?.header('x-forwarded-for') || ctx.request?.header('x-real-ip')

			const { request, response } = ctx

			const _id = request.params().id || request.params()._id

			const r = await originalMethod.apply(this, args)

			const stock = ctx.request.body() as StockProcedure

			const unity_id = ctx.auth.user?.unity_id
			const user = ctx.auth.user?._id

			const Log = await generateCollectionLog(unity_id?.toString() as string)

			const body = response.getBody()

			const status = response.getStatus()

			if (status >= 400) return r


			try {
				const collection_id = getCollectionId(body, _id)

				switch (type) {
					case ACTION.PUT:
						await Log?.create({
							action: type,
							collection_name: COLLECTION_NAME,
							date,
							original: {
								value: 0,
								label: '',
								quantity: 0,
								price_cost: 0,
								price_final: 0
							},
							modified: stock,
							ip,
							user,
							collection_id,
							unity_id,
						})
						break
					case ACTION.DELETE:
						await Log?.create({
							action: type,
							collection_name: COLLECTION_NAME,
							date,
							modified: {
								value: 0,
								label: 'REMOVIDO',
								quantity: 0,
								price_cost: 0,
								price_final: 0
							},
							original: stock,
							ip,
							user,
							collection_id,
							unity_id,
						})
						break
				}


			} catch (error) {
				console.log(error)
			}

			return r
		}
		return descriptor
	}
}
