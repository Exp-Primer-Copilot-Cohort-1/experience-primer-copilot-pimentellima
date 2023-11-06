import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { IPrescription } from "App/Types/IPrescription";

export interface PrescriptionManagerContract {
    findAll: (unity_id: string) => PromiseEither<AbstractError, any>
    update: (_id: string, data: IPrescription) => PromiseEither<AbstractError, any>
    create: (data: IPrescription) => PromiseEither<AbstractError, any>
    updateStatus: (_id: string, status: boolean) => PromiseEither<AbstractError, any>
    findById: (_id: string) => PromiseEither<AbstractError, any>
}