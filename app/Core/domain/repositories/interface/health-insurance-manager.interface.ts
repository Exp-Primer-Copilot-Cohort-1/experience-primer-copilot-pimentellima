import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { HealthInsuranceParams, IHealthInsurance } from 'Types/IHealthInsurance'

export interface HealthInsuranceManagerInterface {
	findAllByUnityId: (
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findAllByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IHealthInsurance[]>
	findById: (id: string) => PromiseEither<AbstractError, IHealthInsurance>
	update: (
		id: string,
		entity: Partial<IHealthInsurance>,
	) => PromiseEither<AbstractError, IHealthInsurance>
	create: (
		unity_id: string,
		params: HealthInsuranceParams,
	) => PromiseEither<AbstractError, IHealthInsurance>
}
