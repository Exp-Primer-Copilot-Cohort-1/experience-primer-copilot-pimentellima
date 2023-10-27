import { AbstractError } from "App/Core/errors/error.interface"
import { UseCase } from "App/Core/interfaces/use-case.interface"
import { PromiseEither } from "App/Core/shared"
import { ICostCenter } from "App/Types/ICostCenter"
import { inject, injectable, registry } from "tsyringe"
import { CostCenterManagerContract } from "../../repositories/cost-center/const-center-manager.interface"
import { CostCenterMongooseRepository } from "../../repositories/cost-center/cost-center-mongo-repository"

type TypeParams = {
    id: string
    data: Partial<ICostCenter>
}

@injectable()
@registry([{ token: UpdateCostCenterByIdUseCase, useClass: UpdateCostCenterByIdUseCase }])
export class UpdateCostCenterByIdUseCase
    implements UseCase<Partial<ICostCenter>, ICostCenter>
{
    constructor(
        @inject(CostCenterMongooseRepository)
        private readonly manager: CostCenterManagerContract
    ) { } // eslint-disable-line

    public async execute(params: TypeParams
    ): PromiseEither<AbstractError, ICostCenter> {
        if (!params.id) {
            throw new Error('Id not found')
        }
        return await this.manager.update(params.data,
            params.id)
    }
}