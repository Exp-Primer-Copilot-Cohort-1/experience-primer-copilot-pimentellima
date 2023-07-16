import {
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenrerClient,
	ICensusScheduledEvent,
} from 'Types/ICensus'

export type ICensusCount = {
	procedures: ICensusCountProcedure[]
	health_insurances: ICensusCountHealthInsurances[]
	partners: ICensusCountPartners[]
	scheduled_events: ICensusScheduledEvent[]
	genrer_client: ICensusGenrerClient[]
}
