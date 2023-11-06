import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PrescriptionMongooseRepository } from 'App/Core/domain/repositories'
import { PrescriptionManagerContract } from 'App/Core/domain/repositories/interface'
import { inject, injectable, registry } from 'tsyringe'

type TypeParams = {
    id: string
    status: boolean
}

@injectable()
@registry([{ token: UpdateStatusPrescriptionsByIdUseCase, useClass: UpdateStatusPrescriptionsByIdUseCase }])

export class UpdateStatusPrescriptionsByIdUseCase implements UseCase<TypeParams, any> {
    constructor(@inject(PrescriptionMongooseRepository) private readonly manager: PrescriptionManagerContract) { } // eslint-disable-line

    public async execute(
        { id, status }: TypeParams,
    ): PromiseEither<AbstractError, any> {
        if (!id) {
            return left(new MissingParamsError('_id is required'))
        }
        return await this.manager.updateStatus(
            id.toString(),
            status,
        )
    }
}
