import { UnitNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { FinancialCategoryManagerInterface } from '../../repositories/interface/financial-category-manager.interface'

type FindAllProps = {
    unity_id: string
}

export class FindAllFinancialCategoryByUnityUseCase
    implements UseCase<FindAllProps, IFinancialCategory[]>
{
    // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
    constructor(private readonly financialManager: FinancialCategoryManagerInterface) { }

    public async execute(
        input: FindAllProps,
    ): PromiseEither<AbstractError, IFinancialCategory[]> {
        if (!input?.unity_id) {
            return left(new UnitNotFoundError())
        }

        const financialCategoryOrErr = await this.financialManager.findAllByUnityId(input.unity_id)

        return financialCategoryOrErr
    }
}
