import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusCountPartners,
	ICensusGenrerClient,
	ICensusNewAndOldClients,
} from 'Types/ICensus'

export interface CensusClientsManagerInterface {
	findCesusGenrerClientByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusGenrerClient>

	findCensusPartnersByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCountPartners[]>

	findNewAndOldClientsByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusNewAndOldClients>
}
