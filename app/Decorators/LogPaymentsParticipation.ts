import { FindCurrentPaymentParticipationUseCase } from 'App/Core/domain/use-cases/payment-prof'
import container from 'App/Core/shared/container'
import { COLLECTIONS_NAMES } from 'App/Models'
import generateCollectionLog from 'App/Models/Log'
import { HttpContextContract } from 'App/Types/Adonis'
import { IPaymentParticipations, ParticipationPrice } from 'App/Types/IPaymentProf'
import { ACTION, actionCompare } from './helpers'

type In = { unity_id: string, prof_id: string, health_insurance_id: string, procedure_id: string }

const CurrentUseCase = container.resolve(FindCurrentPaymentParticipationUseCase)

export async function getCurrent(
	props: In,
): Promise<ParticipationPrice> {
	const doc = await CurrentUseCase.execute(props)

	if (doc.isLeft()) return {} as ParticipationPrice

	return doc.extract()
}

export default function LogPaymentParticipationDecorator(collectionName: COLLECTIONS_NAMES) {
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

			const unity_id = ctx.auth.user?.unity_id
			const user = ctx.auth.user?._id

			const Log = await generateCollectionLog(unity_id?.toString() as string)

			const body = request.body() as IPaymentParticipations
			const params = {
				unity_id: unity_id?.toString() as string,
				prof_id: body.prof.value as string,
				health_insurance_id: body.health_insurance.value as string,
				procedure_id: body.procedure.value as string,
			}

			const docOriginal = await getCurrent(params)

			const r = await originalMethod.apply(this, args)

			const status = response.getStatus()

			if (status >= 400) return r

			try {
				const { value, ...docModified } = await getCurrent(params)

				const action = docOriginal.isNew ? ACTION.POST : ACTION.PUT

				const [original, modified] = actionCompare(action, docOriginal, docModified)

				await Log?.create({
					action,
					collection_name: collectionName,
					date,
					modified,
					original,
					user,
					ip,
					collection_id: docOriginal.participation_id?.toString(),
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
