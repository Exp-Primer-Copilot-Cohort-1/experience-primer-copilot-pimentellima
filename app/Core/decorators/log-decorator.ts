// Decorador de função

import { encrypt } from 'App/Helpers/encrypt'
import generateLog from 'App/Models/Log'
import { Either } from '../shared'

const documents = ['rg', 'document', 'cnh', 'titulo_eleitor', 'passaporte']

function maskDocumentValue(value) {
	// Se for uma string, mascare-a. Se for outro tipo, retorne como está.
	return typeof value === 'string' ? '*'.repeat(value.length) : value
}

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

export enum ACTION {
	PUT = 'put',
	DELETE = 'delete',
	POST = 'post',
}

export default function LogDecorator(collectionName: string, action: ACTION) {
	return (
		_target,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor => {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args) {
			// Se estivermos no ambiente de teste, não registre logs
			if (process.env.NODE_ENV === 'test') {
				return originalMethod.apply(this, args)
			}

			// Com isso podemos acessar o banco de dados sem importar o Mongoose no início do arquivo,
			// evitando de quebrar os testes
			const db = (await import('@ioc:Mongoose')).default

			const item = args[0] // O primeiro argumento é o item que está sendo criado/editado

			const id = item._id || item.id

			// busca o item no banco de dados para comparar com o item que está sendo criado/editado
			const props = (await db.model(collectionName).findById(id)) || {}

			let user = args[1] // O segundo argumento é o usuário que está criando/editando o item

			const unity_id = user?.unity_id || item.unity_id || props.unity_id

			const Log = await generateLog(unity_id.toString()) // Gera o model de log da unidade

			// Converte o usuário para o formato que o Log espera
			if (user) {
				user = {
					label: user.name,
					value: user._id,
				}
			}

			const date = new Date().toLocaleString() // Pega a data atual
			const result: Either<any, any> = await originalMethod.apply(this, args) // Executa o método original

			// Se o método original retornar um erro, não registre o log
			if (result.isLeft()) {
				return result
			}

			const value = result.extract()

			const [before, after] = deepCompare(props, value) // Compara o item que está sendo criado/editado com o item do banco de dados

			// Busca o id do item que está sendo criado/editado
			const collection_id =
				value.participation_id?.toString() || value._id?.toString() || value._id

			// Reduzir o tamanho do log para action === 'post', pois o after é o objeto inteiro, sendo redundante
			if (action === ACTION.POST) {
				await Log.create({
					action,
					collection_name: collectionName,
					date,
					after: 'Criado',
					user,
					collection_id,
					unity_id: unity_id.toString(),
				})
				return result
			}

			await Log.create({
				action,
				collection_name: collectionName,
				date,
				before,
				after,
				user,
				collection_id,
				unity_id: unity_id.toString(),
			})

			return result
		}

		return descriptor
	}
}
