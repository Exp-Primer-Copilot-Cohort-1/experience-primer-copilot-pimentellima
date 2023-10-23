import { UnityEntity } from 'App/Core/domain/entities/user/unity'
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IUnity } from 'App/Types/IUnity'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateUnityUseCase, useClass: CreateUnityUseCase }])
export class CreateUnityUseCase implements UseCase<IUnity, IUnity> {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(
		@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract
	) { }

	public async execute(unity: IUnity): PromiseEither<AbstractError, IUnity> {
		const unityEntityOrErr = await UnityEntity.build(unity)

		if (unityEntityOrErr.isLeft()) return unityEntityOrErr

		const doc = unityEntityOrErr.extract()

		const unityOrErr = await this.manager.create(doc)

		return unityOrErr
	}
}
