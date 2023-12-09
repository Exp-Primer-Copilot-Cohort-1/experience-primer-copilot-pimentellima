import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ProcedureNotFoundError } from 'App/Core/domain/errors/procedure-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Procedure, { COLLECTIONS_REFS } from 'App/Models/Procedure'
import { BasicProcedure, IProcedure } from 'App/Types/IProcedure'
import { StockProcedure } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { makePipelineBasicProcedure } from './pipelines'
import { ProceduresManagerContract } from './procedures-manager.interface'

@injectable()
@registry([{ token: ProceduresMongooseRepository, useClass: ProceduresMongooseRepository }])
export class ProceduresMongooseRepository implements ProceduresManagerContract {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { }

	async addProduct(id: string, product: StockProcedure): PromiseEither<AbstractError, IProcedure> {
		const doc = await Procedure.findByIdAndUpdate(id, {
			$push: {
				products: product,
			},
		}, {
			new: true
		})
			.orFail(new ProcedureNotFoundError())

		return right(doc.toObject())
	}

	async removeProduct(id: string, product_id: string): PromiseEither<AbstractError, IProcedure> {

		const doc = await Procedure.findByIdAndUpdate(id, {
			$pull: {
				products: {
					value: product_id
				},
			},
		}, {
			new: true
		})
			.orFail(new ProcedureNotFoundError())

		return right(doc.toObject())
	}

	async findBasic(
		id: string,
		health_insurance_id: string
	): PromiseEither<AbstractError, BasicProcedure> {
		const pipeline = makePipelineBasicProcedure(id, health_insurance_id)

		const [procedure] = await Procedure.aggregate(pipeline)

		if (!procedure) return left(new ProcedureNotFoundError())

		return right(procedure as BasicProcedure)
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, IProcedure[]> {
		const procedures = await Procedure.find({
			unity_id: unity_id,
			active: this.opts.active
		})
			.skip(this.opts.skip)
			.limit(this.opts.limit)
			.sort(this.opts.sort)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.exec()

		if (!procedures) return right([])

		return right(procedures as unknown as IProcedure[])
	}

	async findById(id: string): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.findById(id)
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

	async delete(id: string): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.findById(id).orFail(
			new ProcedureNotFoundError(),
		)
		return right(procedure?.toObject())
	}

	// Remove o _id do objeto e retorna o objeto com o _id gerado pelo mongo
	async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...data
	}: Partial<IProcedure>): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.create(data)

		return right(procedure.toObject())
	}

	async update(
		id: string,
		data: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		const procedures = await Procedure
			.findByIdAndUpdate(id, data, { new: true })
			.orFail()

		return right(procedures)
	}
}
