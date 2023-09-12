import { UnityEntity } from 'App/Core/domain/entities/user/unity'
import { UnitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IUnity } from 'Types/IUnity'

export class CreateUnityUseCase implements UseCase<IUnity, IUnity> {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor(private readonly manager: UnitiesManagerInterface) { }

	public async execute(
		unity: IUnity,
		session = undefined,
	): PromiseEither<AbstractError, IUnity> {
		const unityEntityOrErr = await UnityEntity.build(unity)

		if (unityEntityOrErr.isLeft()) return unityEntityOrErr

		const doc = unityEntityOrErr.extract().params() as IUnity

		const unityOrErr = await this.manager.create(doc, session)

		return unityOrErr
	}
}
