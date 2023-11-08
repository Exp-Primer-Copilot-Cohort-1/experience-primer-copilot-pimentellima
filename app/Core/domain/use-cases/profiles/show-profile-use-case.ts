import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IProfile } from "App/Types/IUser";
import { inject, injectable, registry } from "tsyringe";
import { IdNotProvidedError } from "../../errors";
import { ProfileManagerContract } from "../../repositories/interface/profile-manager.interface";
import { ProfileMongooseRepository } from "../../repositories/profile/profile-mongo-repository";

type Input = {
	_id: string
}
@injectable()
@registry([{ token: ShowProfileUseCase, useClass: ShowProfileUseCase }])

export class ShowProfileUseCase
	implements UseCase<Input, IProfile>
{
	constructor(
		@inject(ProfileMongooseRepository) private readonly manager: ProfileManagerContract
	) { }

	public async execute({ _id }: Input): PromiseEither<AbstractError, IProfile> {
		if (!_id) return left(new IdNotProvidedError())

		return this.manager.findById(_id)
	}
}
