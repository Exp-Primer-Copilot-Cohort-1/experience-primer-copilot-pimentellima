import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ICostCenter } from "App/Types/ICostCenter";
import { inject, injectable, registry } from "tsyringe";
import { IdNotProvidedError } from "../../errors";
import { CostCenterManagerContract } from "../../repositories/cost-center/const-center-manager.interface";
import { CostCenterMongooseRepository } from "../../repositories/cost-center/cost-center-mongo-repository";

type Input = {
    id: string
}
@injectable()
@registry([{ token: FindCostCenterByIdUseCase, useClass: FindCostCenterByIdUseCase }])

export class FindCostCenterByIdUseCase
    implements UseCase<Input, ICostCenter>
{
    constructor(
        @inject(CostCenterMongooseRepository) private readonly manager: CostCenterManagerContract
    ) { }

    public async execute({ id }: Input): PromiseEither<AbstractError, ICostCenter> {

        if (!id) return left(new IdNotProvidedError())
        const costCenterOrErr =
            await this.manager.findById(id);

        if (costCenterOrErr.isLeft()) {
            return left(costCenterOrErr.extract())
        }

        return right(costCenterOrErr.extract())


    }
}
