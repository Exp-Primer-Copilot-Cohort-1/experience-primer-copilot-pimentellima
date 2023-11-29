import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import {
	MissingParamsError,
	ParticipationPaymentsNotFoundError,
	UnityNotFoundError,
} from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf, ParticipationPrice } from 'App/Types/IPaymentProf'
import { Types } from 'mongoose'
import { PaymentProfManagerContract } from '../interface/payment-prof-manager-interface'

import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import PaymentParticipations from 'App/Models/PaymentParticipations'
import { inject, injectable, registry } from 'tsyringe'

const ObjectId = Types.ObjectId

const generatePipeline = (match: any, active: boolean) => [
	{
		$match: match,
	},
	{ $unwind: '$prices' },
	{
		$match: {
			'prices.active': active,
		},
	},
	{
		$lookup: {
			from: 'users',
			localField: 'prof',
			foreignField: '_id',
			as: 'profObj',
		},
	},
	{
		$lookup: {
			from: 'health_insurances',
			localField: 'health_insurance',
			foreignField: '_id',
			as: 'health_insuranceObj',
		},
	},
	{
		$lookup: {
			from: 'procedures',
			localField: 'procedure',
			foreignField: '_id',
			as: 'procedureObj',
		},
	},
	{
		$project: {
			_id: '$prices._id',
			participation_id: '$_id',
			value: '$prices.abs',
			abs: '$prices.abs',
			prof: {
				value: { $arrayElemAt: ['$profObj._id', 0] },
				label: { $arrayElemAt: ['$profObj.name', 0] },
			},
			health_insurance: {
				value: { $arrayElemAt: ['$health_insuranceObj._id', 0] },
				label: { $arrayElemAt: ['$health_insuranceObj.name', 0] },
			},
			procedure: {
				value: { $arrayElemAt: ['$procedureObj._id', 0] },
				label: { $arrayElemAt: ['$procedureObj.name', 0] },
			},
			percent: '$prices.percent',
			active: '$prices.active',
			unity_id: 1,
			date_start: '$prices.date_start',
			date_end: '$prices.date_end',
		},
	},
]

const createFilter = (participation: IPaymentProf) => ({
	health_insurance: new ObjectId(participation.health_insurance.value.toString()),
	procedure: new ObjectId(participation.procedure.value.toString()),
	prof: new ObjectId(participation.prof.value.toString()),
})
@injectable()
@registry([{ token: PaymentProfMongoRepository, useClass: PaymentProfMongoRepository }])
export class PaymentProfMongoRepository implements PaymentProfManagerContract {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction,
		@inject(OptsQuery) private readonly opts: OptsQuery,
	) { } // eslint-disable-line

	private async createDefaultParticipation(
		{ health_insurance_id, prof_id, unity_id, procedure_id }
	): PromiseEither<AbstractError, ParticipationPrice> {
		const defaultParticipationOrErr = await this.createOrUpdatePaymentProf({
			abs: 0,
			active: true,
			health_insurance: {
				label: '',
				value: health_insurance_id,
			},
			prof: {
				label: '',
				value: prof_id,

			},
			unity_id,
			percent: 0,
			procedure: {
				label: '',
				value: procedure_id,
			}
		})
		if (defaultParticipationOrErr.isLeft()) return left(defaultParticipationOrErr.extract())

		const defaultParticipation = defaultParticipationOrErr.extract()

		return right({
			_id: defaultParticipation._id,
			abs: defaultParticipation.abs,
			participation_id: defaultParticipation.participation_id,
			percent: defaultParticipation.percent,
			active: defaultParticipation.active,
			isNew: true,
			date_start: new Date(),
		})
	}

	async createOrUpdatePaymentProf(
		participation: IPaymentProf,
	): PromiseEither<AbstractError, IPaymentProf> {
		if (!participation) return left(new MissingParamsError('participation'))

		const filter = {
			...createFilter(participation),
			unity_id: participation.unity_id,
		}

		const doc = await PaymentParticipations.findOneAndUpdate(
			filter,
			{
				$setOnInsert: {
					prices: [],
				},
			},
			{
				upsert: true,
				new: true,
			},
		)

		for (let i = 0; i < doc.prices?.length; i++) {
			doc.prices[i].active = false
			if (!doc.prices[i].date_end) {
				doc.prices[i].date_end = new Date()
			}
		}

		doc.prices.push({
			active: true,
			date_start: new Date(),
			abs: participation.abs,
			percent: participation.percent,
		})

		await doc.save()

		return right({
			...participation,
			_id: doc._id.toString(),
			participation_id: doc._id.toString(),
		})
	}

	async deletePaymentProfById(id: string): PromiseEither<AbstractError, IPaymentProf> {
		if (!id) return left(new ParticipationPaymentsNotFoundError())

		const item = await PaymentParticipations.findByIdAndDelete(id).orFail(
			new ParticipationPaymentsNotFoundError(),
		)

		return right(item.toObject())
	}

	async findPaymentProfById(id: string): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!id) return left(new ParticipationPaymentsNotFoundError())

		const pipeline = generatePipeline(
			{ prof: new ObjectId(id.toString()) },
			this.opts.active,
		)

		const data = await PaymentParticipations.aggregate(pipeline)

		return right(data)
	}

	async findAllPaymentProfs(
		unity_id: string,
	): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		const pipeline = generatePipeline(
			{ unity_id: new ObjectId(unity_id.toString()) },
			this.opts.active,
		)

		const data = await PaymentParticipations.aggregate(pipeline)
		return right(data)
	}

	async findCurrentPaymentParticipation(
		unity_id: string,
		prof_id: string,
		health_insurance_id: string,
		procedure_id: string,
	): PromiseEither<AbstractError, ParticipationPrice> {
		const pipeline = generatePipeline(
			{
				prof: new ObjectId(prof_id.toString()),
				health_insurance: new ObjectId(health_insurance_id.toString()),
				procedure: new ObjectId(procedure_id.toString()),
				unity_id: new ObjectId(unity_id.toString()),
			},
			true,
		)

		const data = await PaymentParticipations.aggregate(pipeline)

		if (!data?.length) {
			return await this.createDefaultParticipation({
				health_insurance_id,
				prof_id,
				unity_id,
				procedure_id
			})
		}

		return right(data[0])
	}
}
