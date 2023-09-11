import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Procedure from 'App/Models/Procedure'
import { IProcedure } from 'Types/IProcedure'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ProceduresManagerInterface } from '../interface/procedures-manager.interface'

export class ProceduresMongooseRepository implements ProceduresManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	async findById(unity_id: string): PromiseEither<AbstractError, IProcedure[]> {
		const procedures = await Procedure.find({
			unity_id: unity_id,
		})
			.populate('profs', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
			.populate('health_insurances.info', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
		if (!procedures) {
			return left(new UnitNotFoundError())
		}
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
			.populate('profs', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
			.populate('health_insurances.info', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})

		if (!procedure) {
			return left(
				new AbstractError('Procedimento não encontrado no Banco de Dados', 404),
			)
		}
		return right(procedure as unknown as IProcedure)
	}

	async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		const procedure = await Procedure.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id: unity_id,
		})
			.populate('profs', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
			.populate('health_insurances.info', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
		if (!procedure) {
			return left(new UnitNotFoundError())
		}
		return right(procedure as unknown as IProcedure[])
	}
	async deleteById(id: string): PromiseEither<AbstractError, IProcedure> {
		const procedure = await Procedure.findById(id)
			.populate('profs', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
			.populate('health_insurances.info', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
		if (!procedure) {
			return left(new UnitNotFoundError())
		}
		await procedure.remove()
		return right(procedure as unknown as IProcedure)
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

		let populatedProcedure = await procedure.populate('profs', {
			label: '$name',
			value: '$_id',
			_id: 0,
		})

		populatedProcedure = await populatedProcedure.populate('health_insurances.info', {
			label: '$name',
			value: '$_id',
			_id: 0,
		})

		return right(populatedProcedure as unknown as IProcedure)
	}

	async updateProceduresById(
		id: string,
		data: Partial<IProcedure>,
	): PromiseEither<AbstractError, IProcedure> {
		const procedures = await Procedure.findByIdAndUpdate(id, data, { new: true })
			.populate('profs', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
			.populate('health_insurances.info', {
				label: '$name',
				value: '$_id',
				_id: 0,
			})
		if (!procedures) {
			return left(new UnitNotFoundError())
		}
		return right(procedures as unknown as IProcedure)
	}
}
