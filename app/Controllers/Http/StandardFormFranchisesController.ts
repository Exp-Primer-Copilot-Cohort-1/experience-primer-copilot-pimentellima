import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UnityNotFranchise } from 'App/Core/domain/errors/unity-not-franchise'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import { TypeForms } from 'App/Types/IBusinessFranchises'

// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
class StandardFormFranchisesController {

	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnityNotFranchise()

		return businessFranchise?.questions
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { version, min, max, questions, type } = ctx.request.body()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnityNotFranchise()

		businessFranchise.questions?.push({ version, min, max, questions, type })

		await businessFranchise.save()

		return businessFranchise
	}

	async update(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { version, min, max, questions, type } = ctx.request.body()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnityNotFranchise()

		const index = businessFranchise.questions?.findIndex(q => q.version === version)

		if (index === undefined || index === -1) throw new Error('Versão não encontrada')

		businessFranchise.questions[index] = { version, min, max, questions, type }

		await businessFranchise.save()

		return businessFranchise
	}

	async show(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { type } = ctx.params as { type: TypeForms }

		const businessFranchise = await BusinessFranchises.findOne({
			unities: unity_id,
		}).exec()

		if (!businessFranchise) throw new UnityNotFranchise()

		const filtered = businessFranchise.questions?.filter(q => q.type === type)

		if (!filtered?.length) {
			businessFranchise.questions = [
				{
					version: 1,
					min: 0,
					type,
					max: 5,
					questions: [
						{
							question: `Qual o seu nível de dor? ${type}`
						},
						{
							question: `Qual o seu nível de dor? ${type}`
						},
						{
							question: `Qual o seu nível de dor? ${type}`
						},
						{
							question: `Qual o seu nível de dor? ${type}`
						},
						{
							question: `Qual o seu nível de dor? ${type}`
						},
					]
				}
			]

			await businessFranchise.save()
		}

		return businessFranchise.questions.reduce((acc, cur) => {
			if (cur.type === type && cur.version > acc.version) return cur
			return acc
		}, { version: 0, min: 0, max: 0, questions: [], type })
	}
}

export default StandardFormFranchisesController
