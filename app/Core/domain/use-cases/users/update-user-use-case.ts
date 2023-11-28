import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, right } from "App/Core/shared";
import User from "App/Models/User";
import { ROLES } from "App/Roles/types";
import { IUser } from "App/Types/IUser";
import { injectable, registry } from "tsyringe";

type In = IUser & { id: string, userLogged: IUser }

@injectable()
@registry([{ token: UpdateUserUseCase, useClass: UpdateUserUseCase }])
export class UpdateUserUseCase
	implements UseCase<In, IUser>
{
	constructor(
	) { }

	public async execute({
		id,
		type,
		userLogged,
		...data
	}: In): PromiseEither<AbstractError, IUser> {

		const user = await User.findById(id).orFail()
		const isEquals = id === userLogged?._id.toString()

		switch (userLogged?.type) {
			case ROLES.PROF:
				if (isEquals) {
					await user.updateOne(data)
					await user.save()
				}
				break
			case ROLES.SEC:
				if (isEquals) {
					await user.updateOne(data)
					await user.save()
				}
				break
			default:
				await user.updateOne(data)
				await user.save()
				break
		}

		return right(user)
	}
}
