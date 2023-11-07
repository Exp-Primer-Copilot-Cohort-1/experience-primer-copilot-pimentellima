import { UnityNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IPrescription } from 'App/Types/IPrescription'
import { inject, injectable, registry } from 'tsyringe'
import { PrescriptionMongooseRepository } from '../../repositories'
import { PrescriptionManagerContract } from '../../repositories/interface'

type TypeParams = {
    unity_id: string
}

@injectable()
@registry([{ token: FindAllPrescrioptionsUseCase, useClass: FindAllPrescrioptionsUseCase }])
export class FindAllPrescrioptionsUseCase implements UseCase<TypeParams, IPrescription[]> {
    constructor(
        @inject(PrescriptionMongooseRepository) private readonly manager: PrescriptionManagerContract) {
    }

    public async execute(
        { unity_id }: TypeParams,
    ): PromiseEither<AbstractError, IPrescription[]> {
        if (!unity_id) return left(new UnityNotFoundError())

        return await this.manager.findAll(
            unity_id,
        )
    }
}
