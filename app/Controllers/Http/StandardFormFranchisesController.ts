import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UnitNotFranchise } from 'App/Core/domain/errors/unit-not-franchise'
import BusinessFranchises from 'App/Models/BusinessFranchises'

// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
class StandardFormFranchisesController {

	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnitNotFranchise()

		if (!businessFranchise.questions?.length) {
			businessFranchise.questions = [
				{
					version: 1,
					min: 0,
					max: 5,
					questions: [
						{
							question: 'Qual o seu nível de dor?'
						},
						{
							question: 'Qual o seu nível de dor?'
						},
						{
							question: 'Qual o seu nível de dor?'
						},
						{
							question: 'Qual o seu nível de dor?'
						},
						{
							question: 'Qual o seu nível de dor?'
						},
					]
				}
			]

			await businessFranchise.save()
		}

		return businessFranchise?.questions.reduce(
			(acc, cur) => {
				if (acc.version < cur.version) {
					acc.version = cur.version
					acc.min = cur.min
					acc.max = cur.max
					acc.questions = cur.questions
				}
				return acc
			}, { version: 0, questions: [], min: 0, max: 0 })
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { version, min, max, questions } = ctx.request.body()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnitNotFranchise()

		businessFranchise.questions?.push({ version, min, max, questions })

		await businessFranchise.save()

		return businessFranchise
	}

	async update(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()
		const { version, min, max, questions } = ctx.request.body()

		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) throw new UnitNotFranchise()

		const index = businessFranchise.questions?.findIndex(q => q.version === version)

		if (index === undefined || index === -1) throw new Error('Versão não encontrada')

		businessFranchise.questions[index] = { version, min, max, questions }

		await businessFranchise.save()

		return businessFranchise
	}

}

export default StandardFormFranchisesController
