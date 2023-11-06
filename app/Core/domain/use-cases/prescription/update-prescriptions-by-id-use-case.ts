import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { PrescriptionMongooseRepository } from 'App/Core/domain/repositories'
import { PrescriptionManagerContract } from 'App/Core/domain/repositories/interface'
import { IPrescription } from 'App/Types/IPrescription'
import { inject, injectable, registry } from 'tsyringe'
import { z } from 'zod'


const prescriptionSchema = z.object({
    name: z.string(),
    text: z.string(),
    prof: z.object({}),
})

@injectable()
@registry([{ token: UpdatePrescriptionsByIdUseCase, useClass: UpdatePrescriptionsByIdUseCase }])

export class UpdatePrescriptionsByIdUseCase implements UseCase<Partial<IPrescription>, any> {
    constructor(@inject(PrescriptionMongooseRepository) private readonly manager: PrescriptionManagerContract) { } // eslint-disable-line

    public async execute(
        data: Partial<IPrescription>,
    ): PromiseEither<AbstractError, any> {
        if (!data._id) {
            return left(new MissingParamsError('_id'))
        }

        prescriptionSchema.parse(data)

        return await this.manager.update(
            data._id.toString(),
            data,
        )
    }
}
