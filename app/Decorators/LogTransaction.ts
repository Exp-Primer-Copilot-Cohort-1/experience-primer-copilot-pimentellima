import { COLLECTIONS_NAMES } from 'App/Models'
import generateCollectionLog from 'App/Models/Log'
import Transactions, { COLLECTION_REFS } from 'App/Models/Transactions'
import { HttpContextContract } from 'App/Types/Adonis'
import { ITransaction } from 'App/Types/ITransaction'
import { ACTION, actionCompare } from './helpers'

export async function getTransaction(
	action: ACTION | null,
	_id: string,
): Promise<ITransaction> {

	if (action === ACTION.POST) return {} as ITransaction

	const transaction = await Transactions.findById(_id)
		.populate(COLLECTION_REFS.ACCOUNTS, 'name -_id')
		.populate(COLLECTION_REFS.CLIENTS, 'name -_id')
		.populate(COLLECTION_REFS.COST_CENTERS, 'name -_id')
		.populate(COLLECTION_REFS.FINANCIAL_CATEGORIES, 'name -_id')
		.populate(COLLECTION_REFS.PROFS, 'name -_id')
		.populate(COLLECTION_REFS.UNITIES, 'name -_id')
		.orFail()

	return transaction.toObject()
}


export default function LogTransactionDecorator(collectionName: COLLECTIONS_NAMES, action: ACTION) {
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


			const unity_id = ctx.auth.user?.unity_id
			const user = ctx.auth.user?._id

			const Log = await generateCollectionLog(unity_id?.toString() as string)

			let _id = request.params().id || request.params()._id
			const docOriginal = await getTransaction(action, _id)

			const r = await originalMethod.apply(this, args)

			const body = response.getBody()

			if (action === ACTION.POST) {
				_id = body._id
			}

			const status = response.getStatus()

			if (status >= 400) return r

			try {
				const docModified = await getTransaction(null, _id)

				const [original, modified] = actionCompare(action, docOriginal, docModified)

				await Log?.create({
					action,
					collection_name: collectionName,
					date,
					modified,
					original,
					user,
					collection_id: docModified.group_by?.toString(),
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
