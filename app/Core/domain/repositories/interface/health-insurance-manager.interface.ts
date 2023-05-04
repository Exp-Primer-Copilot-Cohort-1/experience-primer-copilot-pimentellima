import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IHealthInsurance } from 'Types/IHealthInsurance'
import { Entity } from '../../entities/abstract/entity.abstract'
import { HealtInsuranceEntity } from '../../entities/health-insurances/health-insurance'

export interface HealthInsuranceManagerInterface {
	findAllByUnityId: (
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findAllByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findById: (id: string) => PromiseEither<AbstractError, HealtInsuranceEntity>
	update: (
		id: string,
		entity: Partial<IHealthInsurance>,
	) => PromiseEither<AbstractError, HealtInsuranceEntity>
	delete: (id: string) => PromiseEither<AbstractError, HealtInsuranceEntity>
	create: (entity: Entity) => PromiseEither<AbstractError, HealtInsuranceEntity>
}
