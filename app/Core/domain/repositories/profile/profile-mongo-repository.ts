import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, right } from "App/Core/shared";
import { decrypt } from "App/Helpers/encrypt";
import Profile from "App/Models/Profile";
import { IProfile } from "App/Types/IUser";
import { injectable, registry } from "tsyringe";
import { ProfileManagerContract } from "../interface/profile-manager.interface";

@injectable()
@registry([{ token: ProfileMongooseRepository, useClass: ProfileMongooseRepository }])
export class ProfileMongooseRepository implements ProfileManagerContract {
    constructor() { }
    async findById(_id: string): PromiseEither<AbstractError, IProfile> {
        const user = await Profile.findById(_id).select('-password').orFail(new AbstractError('Perfil não encontrado', 404))

        return right({
            ...user?.toJSON(),
            document: await decrypt(user?.document as string),
        })
    }
    async update(_id: string, data: IProfile): PromiseEither<AbstractError, any> {
        const user = await Profile.findByIdAndUpdate(_id, data, {
            new: true,
        }).orFail(new AbstractError('Perfil não encontrado', 404))

        return right(user)
    }
}