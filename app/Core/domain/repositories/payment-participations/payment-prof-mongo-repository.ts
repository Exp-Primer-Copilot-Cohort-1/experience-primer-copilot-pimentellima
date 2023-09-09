import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPaymentProf, ParticipationPrice } from 'Types/IPaymentProf'
import { Types } from 'mongoose'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { PaymentProfEntity } from '../../entities/payment-prof/paymentProf'
import { MissingParamsError } from '../../errors/missing-params'
import { PaymentProfManagerInterface } from '../interface/payment-prof-manager-interface'

import PaymentParticipations from 'App/Models/PaymentParticipations'

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
		$project: {
			_id: '$prices._id',
			participation_id: '$_id',
			value: '$prices.abs',
			abs: '$prices.abs',
			percent: '$prices.percent',
			active: '$prices.active',
			procedure: 1,
			health_insurance: 1,
			prof: 1,
			unity_id: 1,
			date_start: '$prices.date_start',
			date_end: '$prices.date_end',
		},
	},
]

const createFilter = (participation: IPaymentProf) => ({
	health_insurance: {
		label: participation.health_insurance.label,
		value: new ObjectId(participation.health_insurance.value.toString()),
	},
	procedure: {
		label: participation.procedure.label,
		value: new ObjectId(participation.procedure.value.toString()),
	},
	prof: {
		label: participation.prof.label,
		value: new ObjectId(participation.prof.value.toString()),
	},
})
export class PaymentProfMongoRepository implements PaymentProfManagerInterface {
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }

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
			abs: participation.value,
			percent: participation.percent,
		})

		await doc.save()

		return right({
			...participation,
			_id: doc._id.toString(),
			payment_participations_id: doc._id.toString(),
		})
	}

	async deletePaymentProfById(
		id: string,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await PaymentParticipations.findByIdAndDelete(id)
		if (!item) return left(new AbstractError('PaymentProf not found', 404))

		const paymentProfOrErr = await PaymentProfEntity.build(item.toObject())
		if (paymentProfOrErr.isLeft())
			return left(new AbstractError('Internal Error', 500))

		return right(paymentProfOrErr.extract())
	}

	async findPaymentProfById(id: string): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!id) return left(new MissingParamsError('id'))

		const pipeline = generatePipeline(
			{ 'prof.value': new ObjectId(id.toString()) },
			this.opts.active,
		)

		const data = await PaymentParticipations.aggregate(pipeline)

		return right(data)
	}

	async findAllPaymentProfs(
		unity_id: string,
	): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

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
				'prof.value': new ObjectId(prof_id.toString()),
				'health_insurance.value': new ObjectId(health_insurance_id.toString()),
				'procedure.value': new ObjectId(procedure_id.toString()),
				unity_id: new ObjectId(unity_id.toString()),
			},
			true,
		)

		const data = await PaymentParticipations.aggregate(pipeline)

		if (!data || data.length === 0)
			return left(new AbstractError('Participation not found', 404))

		return right(data[0])
	}
}
