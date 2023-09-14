import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import Procedure, { COLLECTIONS_REFS } from 'App/Models/Procedure'
import { IProcedure } from 'App/Types/IProcedure'
import { ProcedureNotFoundError } from '../../errors/procedure-not-found'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { ProceduresManagerInterface } from '../interface/procedures-manager.interface'

export class ProceduresMongooseRepository implements ProceduresManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	async findByUnityId(unity_id: string): PromiseEither<AbstractError, IProcedure[]> {
		const procedures = await Procedure.find({
			unity_id: unity_id,
		})
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)

		return right(procedures as unknown as IProcedure[])
	}

	async findByProcedureId(
		id: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.findOne({
			_id: id,
			unity_id: unity_id.toString(),
		})
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.orFail(new ProcedureNotFoundError())

		return right(procedure.toObject())
	}

	async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		const procedure = await Procedure.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id: unity_id,
		})
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.orFail(new ProcedureNotFoundError())

		return right(procedure as unknown as IProcedure[])
	}

	async deleteById(id: string): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.findById(id).orFail(
			new ProcedureNotFoundError(),
		)
		return right(procedure?.toObject())
	}

	// Remove o _id do objeto e retorna o objeto com o _id gerado pelo mongo
	async createProcedure({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...data
	}: Partial<IProcedure>): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.create({
			...data,
			profs: data.profs?.map((prof) => prof.value),
			health_insurances: data.health_insurances?.map((health_insurance) => ({
				info: health_insurance.value,
				price: Number(health_insurance.price.replace(',', '.')),
			})),
		})

		let populatedProcedure = await procedure.populate(
			COLLECTIONS_REFS.PROFS,
			PROJECTION_DEFAULT,
		)

		populatedProcedure = await populatedProcedure.populate(
			COLLECTIONS_REFS.HEALTH_INSURANCES,
			PROJECTION_DEFAULT,
		)

		return right(populatedProcedure.toObject())
	}

	async updateProceduresById(
		id: string,
		data: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		const procedures = await Procedure.findByIdAndUpdate(id, data, { new: true })
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.orFail(new ProcedureNotFoundError())
		return right(procedures as unknown as IProcedure)
	}
}
