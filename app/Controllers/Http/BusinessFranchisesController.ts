import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MissingParamsError, UnitNotFoundError } from 'App/Core/domain/errors'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import User from 'App/Models/User'

const generatePipeline = (unity_id) => [
	{
		$match: {
			unities: unity_id
		}
	},
	{
		$lookup: {
			from: 'unities',
			localField: 'unities',
			foreignField: '_id',
			as: 'unities'
		}
	},
	{
		$unwind: {
			path: '$unities'
		}
	},
	{
		$project: {
			_id: 0,
			value: '$unities._id',
			label: '$unities.name'
		}
	}
]

// ! AVISO
// ! refatorar para usar o padrão da nossa arquitetura
class BusinessFranchisesController {

	async index(ctx: HttpContextContract) {
		ctx.bouncer.with('BusinessFranchisesPolicy').authorize('viewList')
		const user = ctx.auth.user
		const pipeline = generatePipeline(user?.unity_id)

		const unities = await BusinessFranchises.aggregate(pipeline).exec()

		return unities
	}

	async show(ctx: HttpContextContract) {
		ctx.bouncer.with('BusinessFranchisesPolicy').authorize('viewList')
		const { id } = ctx.params

		if (!id) {
			throw new MissingParamsError('id')
		}

		if (!ctx.auth.user?.unity_id) throw new UnitNotFoundError()

		ctx.auth.user.unity_id = id

		const user = await User
			.findByIdAndUpdate(ctx.auth.user._id, { unity_id: id }, { new: true })
			.select('-password')
			.orFail()
			.exec()

		return user
	}

	async isAFranchise(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id.toString()

		const isAFranchise = await BusinessFranchises.exists({ unities: unity_id }).exec()

		return isAFranchise
	}

}

export default BusinessFranchisesController
