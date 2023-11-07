import { UnityNotFoundError } from 'App/Core/domain/errors'
import { FinancialCategoryManagerContract } from 'App/Core/domain/repositories/interface/financial-category-manager.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { inject, injectable, registry } from 'tsyringe'
import { FinancialCategoryMongooseRepository } from '../../repositories/financial-category/financial-category-mongo-repository'

type FindAllProps = {
    unity_id: string
}
@injectable()
@registry([{ token: FindAllFinancialCategoryByUnityUseCase, useClass: FindAllFinancialCategoryByUnityUseCase }])
export class FindAllFinancialCategoryByUnityUseCase
    implements UseCase<FindAllProps, IFinancialCategory[]>
{
    // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
    constructor(@inject(FinancialCategoryMongooseRepository) private readonly manager: FinancialCategoryManagerContract) { }

    public async execute(
        { unity_id }: FindAllProps,
    ): PromiseEither<AbstractError, IFinancialCategory[]> {
        if (!unity_id) {
            return left(new UnityNotFoundError())
        }

        const financialCategoryOrErr = await this.manager.findAll(unity_id)

        return financialCategoryOrErr
    }
}
