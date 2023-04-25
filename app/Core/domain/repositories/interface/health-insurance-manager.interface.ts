import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { Entity } from '../../entities/abstract/entity.abstract'

export interface HealthInsuranceManagerInterface {
	findAllByUnityId: (unity_id: string) => PromiseEither<AbstractError, any[]>
	findAllByName: (name: string, unity_id: string) => PromiseEither<AbstractError, any[]>
	findById: (id: string) => PromiseEither<AbstractError, any>
	update: (id: string, entity: Entity) => PromiseEither<AbstractError, Entity>
	delete: (id: string) => PromiseEither<AbstractError, any>
	create: (entity: Entity) => PromiseEither<AbstractError, Entity>
}
