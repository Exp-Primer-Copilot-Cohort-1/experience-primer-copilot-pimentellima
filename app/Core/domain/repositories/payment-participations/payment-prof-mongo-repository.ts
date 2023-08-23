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

function buildUpdateObject(updateFields: any): any {
	return Object.entries(updateFields).reduce((updateObject: any, [key, value]) => {
		if (value !== undefined) {
			if (typeof value === 'object' && value !== null) {
				for (const subKey in value) {
					if (value[subKey] !== undefined) {
						updateObject[`prices.$.${key}.${subKey}`] = value[subKey]
					}
				}
			} else {
				updateObject[`prices.$.${key}`] = value
			}
		}
		return updateObject
	}, {})
}

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

	async createPaymentProf(
		participation: IPaymentProf,
	): PromiseEither<AbstractError, IPaymentProf> {
		if (!participation) return left(new MissingParamsError('participation'))

		const filter = {
			...createFilter(participation),
			unity_id: participation.unity_id,
		}

		const doc = await PaymentParticipations.findOne(filter)

		if (!doc) throw new AbstractError('Não foi possível criar a participação', 500)

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

	async updatePaymentProfById(
		participation: IPaymentProf,
		id: string,
		prof_id: string,
	): PromiseEither<AbstractError, IPaymentProf> {
		if (!id || !prof_id) return left(new MissingParamsError('id or prof_id'))

		const _id = new ObjectId(id.toString())
		const set = buildUpdateObject(participation)

		const updateOrErr = await PaymentParticipations.findOneAndUpdate(
			{
				_id: new ObjectId(prof_id.toString()),
				'prices._id': _id,
			},
			{
				$set: set,
			},
			{
				new: true,
				projection: {
					prices: {
						$elemMatch: { _id },
					},
				}, // isso fará com que a função retorne apenas o elemento atualizado do array
			},
		)

		return right({
			_id: updateOrErr?._id,
			payment_participations_id: updateOrErr?._id,
			value: updateOrErr?.prices[0].abs,
			percent: updateOrErr?.prices[0].percent,
			active: updateOrErr?.prices[0].active,
			health_insurance: updateOrErr?.health_insurance,
			procedure: updateOrErr?.procedure,
			prof: updateOrErr?.prof,
			date_start: updateOrErr?.prices[0].date_start,
			date_end: updateOrErr?.prices[0].date_end,
			unity_id: updateOrErr?.unity_id,
		} as IPaymentProf)
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
