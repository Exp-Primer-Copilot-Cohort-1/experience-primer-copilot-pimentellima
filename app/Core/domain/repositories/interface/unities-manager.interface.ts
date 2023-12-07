import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUnity } from 'App/Types/IUnity'

export interface UnitiesManagerContract {
	create: (unity: IUnity, ...args: any) => PromiseEither<AbstractError, IUnity>
	findById: (id: string) => PromiseEither<AbstractError, IUnity>
	findAll: () => PromiseEither<AbstractError, IUnity[]>
	findByName: (name: string) => PromiseEither<AbstractError, IUnity[]>
	deleteById: (id: string) => PromiseEither<AbstractError, IUnity>
	findOne: (id: string) => PromiseEither<AbstractError, IUnity>
	update: (
		id: string,
		data: Partial<IUnity>,
	) => PromiseEither<AbstractError, IUnity>
	updateUnityPicture: (
		id: string,
		picture_url: string,
	) => PromiseEither<AbstractError, IUnity>
}
