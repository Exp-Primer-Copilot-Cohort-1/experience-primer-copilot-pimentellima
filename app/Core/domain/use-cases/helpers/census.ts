import {
	ICensusActivitiesByDays,
	ICensusActivitiesByHealthInsurance,
	ICensusActivitiesByProf,
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenrerClient,
	ICensusMediaTimeAttendance,
	ICensusNewAndOldClients,
	ICensusParticipationPaymentByProf,
	ICensusPaymentByProf,
	ICensusPaymentForm,
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

export type ICensusPayments = {
	count_by_days: ICensusActivitiesByDays
	count_by_activity_by_prof: ICensusActivitiesByProf[]
	payments_by_health_insurances: ICensusActivitiesByHealthInsurance[]
	payment_by_prof: ICensusPaymentByProf[]
	payment_by_partners: ICensusPaymentByProf[]
	payment_participation_by_prof: ICensusParticipationPaymentByProf[]
	payment_form: ICensusPaymentForm[]
}
