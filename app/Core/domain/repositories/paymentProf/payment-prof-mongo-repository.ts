import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import PaymentProf from 'App/Models/PaymentProf'
import Prof from 'App/Models/Prof'
import { IPaymentProf } from 'Types/IPaymentProf'
import { OptsQuery } from '../../entities/helpers/opts-query'
import { PaymentProfEntity } from '../../entities/payment-prof/paymentProf'
import { MissingParamsError } from '../../errors/missing-params'
import { PaymentProfManagerInterface } from '../interface/payment-prof-manager-interface'

import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

const generatePipeline = (match: any, active: boolean) => [
	{
		$match: match,
	},
	{ $unwind: '$payment_participations' },
	{
		$addFields: {
			prof: {
				value: '$_id',
				label: '$name',
			},
		},
	},
	{
		$match: {
			'payment_participations.active': active,
		},
	},
	{
		$project: {
			_id: '$payment_participations._id',
			value: '$payment_participations.value',
			percent: '$payment_participations.percent',
			procedure: '$payment_participations.procedure',
			health_insurance: '$payment_participations.health_insurance',
			active: '$payment_participations.active',
			prof: 1,
			unity_id: 1,
		},
	},
]

function buildUpdateObject(updateFields: any): any {
	return Object.entries(updateFields).reduce((updateObject: any, [key, value]) => {
		if (value !== undefined) {
			if (typeof value === 'object' && value !== null) {
				for (const subKey in value) {
					if (value[subKey] !== undefined) {
						updateObject[`payment_participations.$.${key}.${subKey}`] =
							value[subKey]
					}
				}
			} else {
				updateObject[`payment_participations.$.${key}`] = value
			}
		}
		return updateObject
	}, {})
}

export class PaymentProfMongoRepository implements PaymentProfManagerInterface {
	constructor(private readonly opts: OptsQuery = OptsQuery.build()) { }

	async createPaymentProf(
		paymentProf: IPaymentProf,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const _id = new ObjectId().toString()
		const newPaymentProfOrErr = await PaymentProfEntity.build({ ...paymentProf, _id })
		if (newPaymentProfOrErr.isLeft()) return left(newPaymentProfOrErr.extract())
		const newPaymentProf = newPaymentProfOrErr.extract()

		await Prof.updateOne(
			{ _id: new ObjectId(newPaymentProf.prof.value.toString()) },
			{
				$push: {
					payment_participations: {
						...newPaymentProf.params(),
					},
				},
			},
		)

		return right(newPaymentProf)
	}

	async updatePaymentProfById(
		paymentProf: IPaymentProf,
		id: string,
		prof_id: string,
	): PromiseEither<AbstractError, IPaymentProf> {
		if (!id || !prof_id) return left(new MissingParamsError('id or prof_id'))

		const _id = new ObjectId(id.toString())
		const set = buildUpdateObject(paymentProf)

		const updateOrErr = await Prof.findOneAndUpdate(
			{
				_id: new ObjectId(prof_id.toString()),
				'payment_participations._id': _id,
			},
			{
				$set: set,
			},
			{
				new: true,
				projection: {
					payment_participations: {
						$elemMatch: { _id },
					},
				}, // isso fará com que a função retorne apenas o elemento atualizado do array
			},
		)

		return right(updateOrErr?.payment_participations?.[0] as IPaymentProf)
	}

	async deletePaymentProfById(
		id: string,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await PaymentProf.findByIdAndDelete(id)
		if (!item) return left(new AbstractError('PaymentProf not found', 404))

		const paymentProfOrErr = await PaymentProfEntity.build(item.toObject())
		if (paymentProfOrErr.isLeft())
			return left(new AbstractError('Internal Error', 500))

		return right(paymentProfOrErr.extract())
	}

	async findPaymentProfById(id: string): PromiseEither<AbstractError, IPaymentProf[]> {
		if (!id) return left(new MissingParamsError('id'))

		const pipeline = generatePipeline(
			{ _id: new ObjectId(id.toString()) },
			this.opts.active,
		)

		const data = await Prof.aggregate(pipeline)

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

		const data = await Prof.aggregate(pipeline)

		return right(data)
	}
}
