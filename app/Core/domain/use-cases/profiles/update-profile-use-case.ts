import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IProfile } from 'App/Types/IUser'
import { inject, injectable, registry } from 'tsyringe'
import ProfileEntity from '../../entities/profile/profile'
import { ProfileManagerContract } from '../../repositories/interface/profile-manager.interface'
import { ProfileMongooseRepository } from '../../repositories/profile/profile-mongo-repository'



@injectable()
@registry([{ token: UpdateProfileUseCase, useClass: UpdateProfileUseCase }])
export class UpdateProfileUseCase implements UseCase<IProfile, any> {

	constructor(
		@inject(ProfileMongooseRepository) private readonly manager: ProfileManagerContract
	) { } // eslint-disable-line

	public async execute(data: IProfile): PromiseEither<AbstractError, any> {

		const profileOrErr = await ProfileEntity.build(data)

		if (profileOrErr.isLeft()) return left(profileOrErr.extract())

		const profile = profileOrErr.extract()

		return await this.manager.update(data._id as string, profile)
	}
}
