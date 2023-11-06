import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IPrescription } from 'App/Types/IPrescription'
import { inject, injectable, registry } from 'tsyringe'
import { z } from 'zod'
import { PrescriptionMongooseRepository } from '../../repositories'
import { PrescriptionManagerContract } from '../../repositories/interface'

const prescriptionSchema = z.object({
    name: z.string(),
    text: z.string(),
    prof: z.object({}),
})

@injectable()
@registry([{ token: CreatePrescriptionUseCase, useClass: CreatePrescriptionUseCase }])
export class CreatePrescriptionUseCase implements UseCase<IPrescription, IPrescription> {
    constructor(@inject(PrescriptionMongooseRepository) private readonly manager: PrescriptionManagerContract) { }

    public async execute(data: IPrescription): PromiseEither<AbstractError, IPrescription> {

        prescriptionSchema.parse(data)

        const prescriptionOrErr = await this.manager.create(data)

        if (prescriptionOrErr.isLeft()) return left(prescriptionOrErr.extract())
        const prescription = prescriptionOrErr.extract()
        return right(prescription)
    }
}
