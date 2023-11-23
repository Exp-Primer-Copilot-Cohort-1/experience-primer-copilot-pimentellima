import { AbstractError } from "App/Core/errors/error.interface"
import { UseCase } from "App/Core/interfaces/use-case.interface"
import { PromiseEither, left } from "App/Core/shared"
import { ICostCenter } from "App/Types/ICostCenter"
import { inject, injectable, registry } from "tsyringe"
import { MissingParamsError } from "../../errors"
import { CostCenterManagerContract } from "../../repositories/cost-center/const-center-manager.interface"
import { CostCenterMongooseRepository } from "../../repositories/cost-center/cost-center-mongo-repository"

@injectable()
@registry([{ token: UpdateCostCenterByIdUseCase, useClass: UpdateCostCenterByIdUseCase }])
export class UpdateCostCenterByIdUseCase
    implements UseCase<Partial<ICostCenter>, ICostCenter>
{
    constructor(
        @inject(CostCenterMongooseRepository)
        private readonly manager: CostCenterManagerContract
    ) { } // eslint-disable-line

    public async execute({ id, ...data }: Partial<ICostCenter>
    ): PromiseEither<AbstractError, ICostCenter> {
        if (!id) {
            return left(new MissingParamsError('_id'))
        }

        return await this.manager.update(data,
            id)
    }
}