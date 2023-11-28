import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared/either'
import CostCenter from 'App/Models/CostCenter'
import { ICostCenter } from 'App/Types/ICostCenter'
import { injectable, registry } from 'tsyringe'
import { CostCenterManagerContract } from './const-center-manager.interface'
@injectable()
@registry([{ token: CostCenterMongooseRepository, useClass: CostCenterMongooseRepository }])
export class CostCenterMongooseRepository implements CostCenterManagerContract {

	constructor() { } // eslint-disable-line

	async update(data: Partial<ICostCenter>, id: string): PromiseEither<AbstractError, ICostCenter> {
		const costCenter = await CostCenter.findByIdAndUpdate(id, data, { new: true })
			.orFail(new AbstractError('Centro de Custos não encontrado', 404))


		return right(costCenter.toObject())
	}


	async create({
		_id,
		...data
	}: Partial<ICostCenter>): PromiseEither<AbstractError, ICostCenter> {
		const costCenter = await CostCenter.create(data)

		return right(costCenter.toObject())
	}

	async findById(id: string): PromiseEither<AbstractError, ICostCenter> {

		const costCenter = await CostCenter.findById(id).orFail(new AbstractError('Centro de Custos não encontrado', 404))

		return right(costCenter)
	}
}
