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

		const userLoggerType = userLogged?.type
		const isEquals = id === userLogged?._id.toString()

		if (
			(ROLES.PROF === userLoggerType || ROLES.SEC === userLoggerType)
			&& isEquals
		) {
			const user = await User
				.findByIdAndUpdate(id, data, { new: true })
				.orFail()

			return right(user.toObject())
		}


		const user = await User
			.findByIdAndUpdate(id, data, { new: true })
			.orFail()

		return right(user.toObject())
	}
}
