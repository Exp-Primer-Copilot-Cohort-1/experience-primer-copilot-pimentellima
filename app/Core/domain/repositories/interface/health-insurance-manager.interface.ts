import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { HealthInsuranceParams, IHealthInsurance } from 'Types/IHealthInsurance'
import { HealthInsuranceEntity } from '../../entities/health-insurances/health-insurance'

export interface HealthInsuranceManagerInterface {
	findAllByUnityId: (
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findAllByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findById: (id: string) => PromiseEither<AbstractError, HealthInsuranceEntity>
	update: (
		id: string,
		entity: Partial<IHealthInsurance>,
	) => PromiseEither<AbstractError, HealthInsuranceEntity>
	delete: (id: string) => PromiseEither<AbstractError, HealthInsuranceEntity>
	create: (unity_id: string, params: HealthInsuranceParams) => PromiseEither<AbstractError, IHealthInsurance>
}
