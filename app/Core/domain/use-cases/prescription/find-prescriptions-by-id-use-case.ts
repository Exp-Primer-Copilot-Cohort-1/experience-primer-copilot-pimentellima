import { MissingParamsError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPrescription } from 'App/Types/IPrescription'
import { inject, injectable, registry } from 'tsyringe'
import { PrescriptionMongooseRepository } from '../../repositories'
import { PrescriptionManagerContract } from '../../repositories/interface'

type TypeParams = {
    id: string
}

@injectable()
@registry([{ token: FindPrescriptionsByIdUseCase, useClass: FindPrescriptionsByIdUseCase }])
export class FindPrescriptionsByIdUseCase implements UseCase<TypeParams, IPrescription> {
    constructor(
        @inject(PrescriptionMongooseRepository) private readonly manager: PrescriptionManagerContract) {
    }

    public async execute(
        { id }: TypeParams,
    ): PromiseEither<AbstractError, IPrescription> {
        if (!id) return left(new MissingParamsError('id'))

        return await this.manager.findById(
            id,
        )
    }
}
