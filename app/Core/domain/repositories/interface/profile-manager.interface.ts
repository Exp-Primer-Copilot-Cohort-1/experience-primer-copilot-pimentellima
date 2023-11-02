import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { IProfile } from "App/Types/IUser";

export interface ProfileManagerContract {
    findById: (_id: string) => PromiseEither<AbstractError, IProfile>
    update: (_id: string, data: IProfile) => PromiseEither<AbstractError, any>
}