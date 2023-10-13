import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import BusinessFranchises from 'App/Models/BusinessFranchises'
import { IBusinessFranchises } from 'App/Types/IBusinessFranchises'
import { injectable, registry } from "tsyringe"
import { UnityNotFranchise } from '../../errors/unity-not-franchise'
import { BusinessFranchisesManagerInterface } from '../interface/business-franchises-manager.interface'

@injectable()
@registry([{ token: BusinessFranchisesRepository, useClass: BusinessFranchisesRepository }])
export class BusinessFranchisesRepository implements BusinessFranchisesManagerInterface {

	constructor() { } // eslint-disable-line

	async findByUnityId(unity_id: string): PromiseEither<AbstractError, IBusinessFranchises> {
		const businessFranchise = await BusinessFranchises.findOne({ unities: unity_id }).exec()

		if (!businessFranchise) return left(new UnityNotFranchise())

		return right(businessFranchise.toObject())
	}
}

