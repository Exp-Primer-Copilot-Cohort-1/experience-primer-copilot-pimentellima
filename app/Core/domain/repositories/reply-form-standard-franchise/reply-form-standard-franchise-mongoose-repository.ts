
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import ReplyFormStandardFranchises from 'App/Models/ReplyFormStandardFranchises'
import { IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises'
import { injectable, registry } from 'tsyringe'
import { RFormSFManagerInterface } from '../interface/reply-form-standard-franchise-manager.interface'

@injectable()
@registry([{ token: RFormSFMongooseManager, useClass: RFormSFMongooseManager }])
export class RFormSFMongooseManager implements RFormSFManagerInterface {
	async create(item: IReplyFormStandardFranchises): PromiseEither<AbstractError, IReplyFormStandardFranchises> {
		const doc = await ReplyFormStandardFranchises.create(item)

		return right(doc.toObject())
	}
}
