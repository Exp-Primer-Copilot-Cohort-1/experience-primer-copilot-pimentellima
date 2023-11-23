import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import Prescription from 'App/Models/Prescription'
import { IPrescription } from 'App/Types/IPrescription'
import { inject, injectable, registry } from 'tsyringe'
import { PrescriptionManagerContract } from '../interface'

@injectable()
@registry([
	{ token: PrescriptionMongooseRepository, useClass: PrescriptionMongooseRepository },
])
export class PrescriptionMongooseRepository implements PrescriptionManagerContract {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(@inject(OptsQuery) private readonly opts: OptsQuery) {}

	async findAll(unity_id: string): PromiseEither<AbstractError, any> {
		const prescriptions = await Prescription.where({
			unity_id: unity_id,
			active: this.opts.active,
		})
			.populate('prof', { label: '$name', value: '$_id', _id: 0 })
		return right(prescriptions)
	}

	async findById(_id: string): PromiseEither<AbstractError, any> {
		const prescriptions = await Prescription.where({
			_id: _id,
		})
			.populate('prof', { label: '$name', value: '$_id', _id: 0 })
			.orFail(new AbstractError('Não Encontrada', 404))

		return right(prescriptions)
	}

	async create(data: IPrescription): PromiseEither<AbstractError, IPrescription> {
		const prescription = await Prescription.create({ ...data, prof: data.prof.value })

		return right(prescription.toObject())
	}

	async update(id: string, { prof, ...data }: any): PromiseEither<AbstractError, any> {
		const prescription = await Prescription.findByIdAndUpdate(
			id,
			{
				...data,
			},
			{
				new: true,
			},
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return right(prescription)
	}
	async updateStatus(_id: string, status: boolean): PromiseEither<AbstractError, any> {
		const prescription = await Prescription.findByIdAndUpdate(
			_id,
			{
				$set: { active: status },
			},
			{ new: true },
		).populate('prof', { label: '$name', value: '$_id', _id: 0 })

		return right(prescription)
	}
}
