import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUnity } from 'Types/IUnity'

export interface UnitiesManagerInterface {
	findById: (id: string) => PromiseEither<AbstractError, IUnity>
	findAll: () => PromiseEither<AbstractError, IUnity[]>
	findByName: (name: string) => PromiseEither<AbstractError, IUnity[]>
	deleteById: (id: string) => PromiseEither<AbstractError, IUnity>
	findOne: (id: string) => PromiseEither<AbstractError, IUnity>
	updateUnitiesById: (id: string, data: any) => PromiseEither<AbstractError, IUnity>
}
