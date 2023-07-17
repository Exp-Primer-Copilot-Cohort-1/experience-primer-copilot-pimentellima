import {
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenrerClient,
	ICensusMediaTimeAttendance,
	ICensusNewAndOldClients,
	ICensusScheduledEvent,
} from 'Types/ICensus'

export type ICensusCount = {
	procedures: ICensusCountProcedure[]
	health_insurances: ICensusCountHealthInsurances[]
	partners: ICensusCountPartners[]
	scheduled_events: ICensusScheduledEvent
	genrer_clients: ICensusGenrerClient
	media_time_attendance: ICensusMediaTimeAttendance
	new_and_old_clients: ICensusNewAndOldClients
}
