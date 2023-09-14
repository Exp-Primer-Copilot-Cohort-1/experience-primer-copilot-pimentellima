import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusCountPartners,
	ICensusGenderClient,
	ICensusNewAndOldClients,
} from 'App/Types/ICensus'

export interface CensusClientsManagerInterface {
	findCensusGenderClientByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusGenderClient>

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
