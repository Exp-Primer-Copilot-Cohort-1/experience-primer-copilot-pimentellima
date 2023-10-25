import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import ReplyFormStandardFranchisesEntity from 'App/Core/domain/entities/reply-form-standard-franchises/reply-form-standard-franchises'
import { BusinessFranchisesRepository } from 'App/Core/domain/repositories/business-franchises/business-franchises-mongoose-repository'
import { BusinessFranchisesManagerContract } from 'App/Core/domain/repositories/interface/business-franchises-manager.interface'
import { RFormSFManagerContract } from 'App/Core/domain/repositories/interface/reply-form-standard-franchise-manager.interface'
import { RFormSFMongooseManager } from 'App/Core/domain/repositories/reply-form-standard-franchise/reply-form-standard-franchise-mongoose-repository'
import EmitEventDecorator from 'App/Decorators/EmitEvent'
import { IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises'
import { inject, injectable, registry } from 'tsyringe'

type In = IReplyFormStandardFranchises
type Out = IReplyFormStandardFranchises

@injectable()
@registry([{ token: CreateRFormsStandardFUseCase, useClass: CreateRFormsStandardFUseCase }])
export class CreateRFormsStandardFUseCase implements UseCase<In, Out> {

	constructor(
		@inject(RFormSFMongooseManager) private readonly manager: RFormSFManagerContract,
		@inject(BusinessFranchisesRepository) private readonly franchiseManager: BusinessFranchisesManagerContract
	) { } // eslint-disable-line

	@EmitEventDecorator('new:reply-form-standard-franchise')
	public async execute(
		{ unity_id, prof, ...reply }: In,
	): PromiseEither<AbstractError, Out> {
		const businessFranchiseOrErr = await this.franchiseManager.findByUnityId(unity_id.toString())

		if (businessFranchiseOrErr.isLeft()) return left(businessFranchiseOrErr.extract())

		const businessFranchise = businessFranchiseOrErr.extract()

		const entityOrErr = await ReplyFormStandardFranchisesEntity.build({
			...reply,
			prof: prof,
			franchise: businessFranchise._id,
			unity_id,
		})

		if (entityOrErr.isLeft()) throw entityOrErr.extract()

		const entity = entityOrErr.extract()

		const docOrErr = await this.manager.create(entity)

		if (docOrErr.isLeft()) throw docOrErr.extract()

		return docOrErr
	}
}
