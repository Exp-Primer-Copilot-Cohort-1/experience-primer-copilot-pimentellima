import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { inject, injectable, registry } from 'tsyringe'
import { FinancialCategoryMongooseRepository } from '../../repositories/financial-category/financial-category-mongo-repository'
import { FinancialCategoryManagerContract } from '../../repositories/interface/financial-category-manager.interface'

type Input = {
    id: string
}
@injectable()
@registry([{ token: FindFinancialCategoryByIdUseCase, useClass: FindFinancialCategoryByIdUseCase }])
export class FindFinancialCategoryByIdUseCase implements UseCase<Input, any> {
    constructor(@inject(FinancialCategoryMongooseRepository) private readonly manager: FinancialCategoryManagerContract) { }

    public async execute({ id }: Input): PromiseEither<AbstractError, any> {
        if (!id) {
            return left(new MissingParamsError('id'))
        }

        return await this.manager.findById(id)

    }
}
