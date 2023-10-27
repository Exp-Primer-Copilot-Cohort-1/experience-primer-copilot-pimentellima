import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { ICostCenter } from "App/Types/ICostCenter";

export interface CostCenterManagerContract {

    create: (data: any) => PromiseEither<AbstractError, ICostCenter>
    findById: (id: string) => PromiseEither<AbstractError, ICostCenter>
    update: (data: Partial<ICostCenter>, id: string) => PromiseEither<AbstractError, ICostCenter>

}