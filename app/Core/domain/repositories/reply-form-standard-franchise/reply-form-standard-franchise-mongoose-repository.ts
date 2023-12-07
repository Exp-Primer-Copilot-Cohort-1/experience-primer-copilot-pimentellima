
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import ReplyFormStandardFranchises from 'App/Models/ReplyFormStandardFranchises'
import { TypeForms } from 'App/Types/IBusinessFranchises'
import { IInfoReplyFormStandardFranchises, IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises'
import { injectable, registry } from 'tsyringe'
import { RFormSFManagerContract } from '../interface/reply-form-standard-franchise-manager.interface'

@injectable()
@registry([{ token: RFormSFMongooseManager, useClass: RFormSFMongooseManager }])
export class RFormSFMongooseManager implements RFormSFManagerContract {
	async findAllByGroupId(
		group_id: string,
		type: TypeForms,
	): PromiseEither<AbstractError, IReplyFormStandardFranchises[]> {
		const docs = await ReplyFormStandardFranchises.find({ group_id, type })

		return right(docs?.map(doc => doc.toObject()))
	}

	async create(item: IReplyFormStandardFranchises): PromiseEither<AbstractError, IReplyFormStandardFranchises> {
		const doc = await ReplyFormStandardFranchises.create(item)

		return right(doc.toObject())
	}

	async findInfoThisReply(group_id: string): PromiseEither<AbstractError, IInfoReplyFormStandardFranchises> {
		const pipeline = [
			{
				$match: {
					group_id: group_id,
				},
			},
			{
				$lookup: {
					from: 'clients',
					localField: 'client',
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$unwind: {
					path: '$client',
				},
			},
			{
				$lookup: {
					from: 'unities',
					localField: 'unity_id',
					foreignField: '_id',
					as: 'unity',
				},
			},
			{
				$unwind: {
					path: '$unity',
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'unity.coordinator',
					foreignField: '_id',
					as: 'unity.coordinator',
				},
			},
			{
				$unwind: {
					path: '$unity.coordinator',
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'prof',
					foreignField: '_id',
					as: 'prof',
				},
			},
			{
				$unwind: {
					path: '$prof',
				},
			},
			{
				$lookup: {
					from: 'activities',
					localField: 'activity',
					foreignField: '_id',
					as: 'activity',
				},
			},
			{
				$unwind: {
					path: '$activity',
				},
			},
			{
				$lookup: {
					from: 'procedures',
					localField: 'activity.procedures._id',
					foreignField: '_id',
					as: 'activity.procedures',
					pipeline: [
						{
							$project: {
								_id: 0,
								name: 1,
								minutes: 1,
								color: 1,
							},
						},
					],
				}
			},
			{
				$project: {
					_id: 0,
					client: {
						name: 1,
						email: 1,
					},
					coordinator: {
						name: '$unity.coordinator.name',
						email: '$unity.coordinator.email',
					},
					unity: {
						name: '$unity.name',
						email: '$unity.email',
					},
					prof: {
						name: 1,
						email: 1,
					},
					procedures: '$activity.procedures',
					date: {
						$dateToString: {
							format: '%d/%m/%Y',
							date: '$created_at',
						},
					},
				},
			},
		]

		const docs = await ReplyFormStandardFranchises.aggregate(pipeline)

		if (docs.length === 0) {
			throw new Error('Reply not found')
		}

		return right(docs[0])
	}

}
